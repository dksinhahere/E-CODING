from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import qrcode
import os
from django.conf import settings

def home(req):
    return render(req, "home/index.html")

@csrf_exempt
def generateQr(req):
    if req.method != "POST":
        return JsonResponse({"status": "error", "message": "Only POST requests allowed"}, status=405)

    try:
        data = json.loads(req.body)
        name_or_url = data.get("url_data", "").strip()

        if not name_or_url:
            return JsonResponse({"status": "error", "message": "url_data is required"}, status=400)

        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
        file_path = os.path.join(settings.MEDIA_ROOT, "qrcode.png")

        image = qrcode.make(name_or_url)
        image.save(file_path)

        return JsonResponse({
            "status": "success",
            "message": f"QR code generated for: {name_or_url}",
            "file": "/media/qrcode.png"
        })

    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON data"}, status=400)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
