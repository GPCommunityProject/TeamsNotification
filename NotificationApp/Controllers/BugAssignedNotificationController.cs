using AdaptiveCards.Templating;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.TeamsFx.Conversation;
using Newtonsoft.Json;
using NotificationApp.Models;
using System.Text;

namespace NotificationApp.Controllers
{
    [Route("api/bug/assigned/notification")]
    [ApiController]
    public class BugAssignedNotificationController : ControllerBase
    {
        private readonly ConversationBot _conversation;
        private readonly string _adaptiveCardFilePath = Path.Combine(".", "Resources", "BugAssignedNotification.json");

        public BugAssignedNotificationController(ConversationBot conversation)
        {
            this._conversation = conversation;
        }

        [HttpPost]
        public async Task<ActionResult> PostAsync(ItemStateChangedModel model, CancellationToken cancellationToken = default)
        {
            // Read adaptive card template
            var cardTemplate = await System.IO.File.ReadAllTextAsync(_adaptiveCardFilePath, cancellationToken);

            var converter = new ReverseMarkdown.Converter();
            var description = converter.Convert(model.resource.revision.fields["Microsoft.VSTS.TCM.ReproSteps"].ToString());

            var installations = await this._conversation.Notification.GetInstallationsAsync(cancellationToken);
            foreach (var installation in installations)
            {
                // Build and send adaptive card
                var cardContent = new AdaptiveCardTemplate(cardTemplate).Expand
                (
                     new
                     {
                         title = $"Bug : {model.resource.revision.fields["System.Title"]}",
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
