using AdaptiveCards.Templating;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.TeamsFx.Conversation;
using Newtonsoft.Json;
using NotificationApp.Models;
using System.Text;

namespace NotificationApp.Controllers
{
    [Route("api/item/commented/notification")]
    [ApiController]
    public class ItemCommentedNotificationController : ControllerBase
    {
        private readonly ConversationBot _conversation;
        private readonly string _adaptiveCardFilePath = Path.Combine(".", "Resources", "ItemCommentedNotification.json");

        public ItemCommentedNotificationController(ConversationBot conversation)
        {
            this._conversation = conversation;
        }

        [HttpPost]
        public async Task<ActionResult> PostAsync(ItemModel model, CancellationToken cancellationToken = default)
        {
            // Read adaptive card template
            var cardTemplate = await System.IO.File.ReadAllTextAsync(_adaptiveCardFilePath, cancellationToken);

            var converter = new ReverseMarkdown.Converter();
            var description = converter.Convert(model.resource.fields["System.Description"].ToString());

            var installations = await this._conversation.Notification.GetInstallationsAsync(cancellationToken);
            foreach (var installation in installations)
            {
                // Build and send adaptive card
                var cardContent = new AdaptiveCardTemplate(cardTemplate).Expand
               (
                    new
                    {
                        title = $"{model.resource.fields["System.Title"]}",
                        description,
                        openUrl = $"{Consts.ItemUrl}/{model.resource.id}",
                    }
               );
                await installation.SendAdaptiveCard(JsonConvert.DeserializeObject(cardContent), cancellationToken);
            }

            return Ok();
        }
    }
}
