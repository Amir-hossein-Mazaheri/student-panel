import { notification } from "antd";

export default function pushNotification(type, title, description) {
  notification[type]({
    message: title,
    description: description,
  });
}
