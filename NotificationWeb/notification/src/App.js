import { Input, Button, Form, Select, Image, Radio, message } from 'antd';
import image1 from './static/img1.png';
import image2 from './static/img2.png';
import video1 from './static/video1.mp3';
import video2 from './static/video2.mp3';
import './App.css';
import { submitForm } from './utils/api';


const { TextArea } = Input;

function App() {
  const imageList = [
    {
      label: 'image1',
      value: image1
    },
    {
      label: 'image2',
      value: image2
    }
  ];
  const videoList = [
    {
      label: 'video1',
      value: video1
    },
    {
      label: 'video2',
      value: video2
    }
  ];

  const timeList = [
    {
      label: 'Immediately',
      value: 1
    }, 
    {
      label: '30 minutes later',
      value: 2
    },
    {
      label: '1 hour later',
      value: 3
    },
    {
      label: '2 hours later',
      value: 4
    }
  ];
  const typeList = [
    {
      label: 'New ticket',
      value: 1
    },
    {
      label: 'Create bug',
      value: 2
    },
    {
      label: "Ticket's status change to done",
      value: 3
    },
    {
      label: "Ticket's status change to InQA",
      value: 4
    },
    {
      label: 'Add comments',
      value: 5
    }
  ];
  const reciverList = [
    {
      label: 'Jessie Zhao',
      value: 'Jessie Zhao'
    },
    {
      label: 'Mike Zhang',
      value: 'Mike Zhang'
    },
    {
      label: 'Nadia Li',
      value: 'Nadia Li'
    },
    {
      label: 'Tony Liu',
      value: 'Tony Liu'
    }
  ];
  const templateList = [
    {
      label: 'Template 1',
      value: 1
    },
    {
      label: 'Template 2',
      value: 2
    },
    {
      label: 'Template 3',
      value: 3
    }
  ];
  const [form] = Form.useForm();
  const imageUrl = Form.useWatch('image', form);
  const type = Form.useWatch('type', form);
  const videoUrl = Form.useWatch('video', form);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    submitForm({
      title: values.title,
      description: values.content
    }).then(res => {
      message.success('Send success!');
    });
    
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="App">
      <Form
        labelCol={{ span: 4 }}
        form={form}
        layout="vertical"
        style={{ width: 600, margin: '30px auto' }}
        className="form"
        onFinish={onFinish}
        initialValues={{
          time: 1,
          type: 1,
        }}
      >
        <Form.Item
          name="type"
          label=""
        >
          <Radio.Group  optionType="button" buttonStyle="solid">
            <Radio.Button value={1}>Ticket</Radio.Button>
            <Radio.Button value={2}>Notification</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {
          type == 1 &&
          <>
            <Form.Item
              name="scenarios"
              label="Scenario"
              rules={[{ required: true, message: 'Please select scenario!'}]}
            >
              <Select placeholder="Select scenario" options={typeList}>
              </Select>
            </Form.Item>
            <Form.Item
              name="reciever"
              label="Reciever"
              rules={[{ required: true, message: 'Please select reciever!'}]}
            >
              <Select placeholder="Select reciver" options={reciverList}>
              </Select>
            </Form.Item>
            <Form.Item
              name="template"
              label="Template"
              rules={[{ required: true, message: 'Please select template!'}]}
            >
              <Select placeholder="Select template" options={templateList}>
              </Select>
            </Form.Item>
          </>
          
        }
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input title!'}]}
        >
          <Input maxLength={100} allowClear placeholder='Please input title' />
        </Form.Item>
        <Form.Item
           name="content"
           label="Content"
           rules={[{ required: true, message: 'Please input content!'}]}
        >
          <TextArea showCount maxLength={300} allowClear rows={3} placeholder='Please input content' />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
        >
          <Select placeholder="Select image" options={imageList} allowClear>
          </Select>
        </Form.Item>
        {
          imageUrl && 
          <Form.Item>
            <Image
              width={100}
              src={imageUrl}
            />
          </Form.Item>
        }
        <Form.Item
          name="video"
          label="Video"
        >
          <Select placeholder="Select video" options={videoList} allowClear>
          </Select>
        </Form.Item>
        {
          videoUrl && 
          <Form.Item>
            <audio
              src={videoUrl}
              controls
            >
              vedio
            </audio>
          </Form.Item>
        }
        <Form.Item
          name="time"
          label="Send time"
          rules={[{ required: true, message: 'Please select send time!'}]}
        >
          <Select placeholder="Select send time" options={timeList}>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginRight: '16px'}}>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
