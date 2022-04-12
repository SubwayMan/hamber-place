from testing.models import Canvas

Canvas.objects.filter(title="testcanvas").delete()
cv = Canvas(title="testcanvas", description="", data="")
cv.save()
