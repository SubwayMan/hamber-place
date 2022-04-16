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

    async def pixel_event(self, event):
        await self.send(text_data=json.dumps({
            "position": event["position"],
            "color": event["color"]
        }))

