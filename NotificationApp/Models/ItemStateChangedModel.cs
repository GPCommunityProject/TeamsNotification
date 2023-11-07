namespace NotificationApp.Models
{
    public class ItemStateChangedModel
    {
        public string id { get; set; }
        public string eventType { get; set; }
        public Message message { get; set; }
        public DetailedMessage detailedMessage { get; set; }
        public ItemStateChangedResource resource { get; set; }
        public string resourceVersion { get; set; }
        public DateTime createdDate { get; set; }
    }

    public class ItemStateChangedResource
    {
        public int id { get; set; }
        public Dictionary<string, FieldValue> fields { get; set; }
        public Revision revision { get; set; }
    }

    public class FieldValue
    {
        public object oldValue { get; set; }
        public object newValue { get; set; }
    }

    public class Revision
    {
        public int id { get; set; }
        public int rev { get; set; }
        public Dictionary<string, object> fields { get; set; }
        public string url { get; set; }
    }
}
