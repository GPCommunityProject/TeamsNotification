using NotificationApp.Models;
using AdaptiveCards.Templating;
using Microsoft.AspNetCore.Mvc;
using Microsoft.TeamsFx.Conversation;
using Newtonsoft.Json;

namespace NotificationApp.Controllers
{
    [Route("api/notification")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly ConversationBot _conversation;
        private readonly string _adaptiveCardFilePath = Path.Combine(".", "Resources", "NotificationDefault.json");

        public NotificationController(ConversationBot conversation)
        {
            this._conversation = conversation;
        }

        [HttpPost]
        public async Task<ActionResult> PostAsync(NotificationModel model, CancellationToken cancellationToken = default)
        {
            // Read adaptive card template
            var cardTemplate = await System.IO.File.ReadAllTextAsync(_adaptiveCardFilePath, cancellationToken);

            var installations = await this._conversation.Notification.GetInstallationsAsync(cancellationToken);
            foreach (var installation in installations)
            {
                // Build and send adaptive card
                var cardContent = new AdaptiveCardTemplate(cardTemplate).Expand
                (
                    new
                    {
                        title = model.title,
                        description = model.description,
                    }
                );
                await installation.SendAdaptiveCard(JsonConvert.DeserializeObject(cardContent), cancellationToken);
            }

            return Ok();
        }
    }
}
