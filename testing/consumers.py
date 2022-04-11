import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class CanvasConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = "canvas"

        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        pixel = text_data_json['position']
        color = text_data_json['color']
        print(pixel, color)
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            {
                'type': 'pixel_event',
                'position': pixel,
                'color': color
            }
        )
    
    def pixel_event(self, event):
        self.send(text_data=json.dumps({
            "position": event["position"],
            "color": event["color"]
        }))

