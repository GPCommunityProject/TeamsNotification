using Microsoft.Graph;
using System.Text.Json.Serialization;

namespace NotificationApp.Models
{
    public class ItemModel
    {
        public string id { get; set; }
        public string eventType { get; set; }
        public Message message { get; set; }
        public DetailedMessage detailedMessage { get; set; }
        public Resource resource { get; set; }
        public string resourceVersion { get; set; }
        public DateTime createdDate { get; set; }
    }

    public class Message
    {
        public string text { get; set; }
    }

    public class DetailedMessage
    {
        public string text { get; set; }
    }

    public class Resource
    {
        public int id { get; set; }
        public Dictionary<string, object> fields { get; set; }
    }
}
