import json
from channels.generic.websocket import AsyncWebsocketConsumer

class CanvasConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "canvas"

        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        pixel = text_data_json['position']
        color = text_data_json['color']
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'pixel_event',
                'position': pixel,
                'color': color
            }
        )
    
    async def pixel_event(self, event):
        await self.send(text_data=json.dumps({
            "position": event["position"],
            "color": event["color"]
        }))

