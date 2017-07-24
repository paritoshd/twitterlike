# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.
from django.conf import settings

from django.http import Http404
from django.shortcuts import render
from django.http import HttpResponse

import os
import json

def twitterView(request):
    loggedInUser = "ParitoshDas"
    path = request.path
    if path.startswith("/"):
        path = path[1:]
    if path == "paritoshdas" or path == "":
        currentUser = "ParitoshDas"
    elif path == "superman":
        currentUser = "SuperMan"
    elif path == "spiderman":
        currentUser = "SpiderMan"
    elif path == "savetweet":
        currentUser = "ParitoshDas"
    else:
        currentUser = None

    if path == "":
        path = "paritoshdas"

    if currentUser == None:
        raise Http404("User does not exist")

    if path == "savetweet":
        if request.is_ajax():
            if request.method == 'POST':
                request_json_data = json.loads(request.body)
                tempFileName = "data" + "/" + request_json_data['userid'] + ".json"
                with open(os.path.join("app/twitterlikepages/static/", tempFileName), 'r') as file_json_data:
                    file_data = json.load(file_json_data)
                    new_entry = {'type': request_json_data['type'], 'retweetedby': '', 'replyto': request_json_data['replyto'],  'details': {'id': '11', 'name': 'Paritosh Das', 'userid': 'paritoshdas', 'aliasid': 'ParitoshDas', 'profile_pic': '../static/images/paritoshprofile.jpg'}, 'messsage': request_json_data['message'], 'timestamp': request_json_data['timestamp']}
                    file_data["tweets"].insert(0, new_entry)
                with open(os.path.join("app/twitterlikepages/static/", tempFileName), 'w') as file_write_data:
                    file_write_data.write(json.dumps(file_data))
        return HttpResponse(status=200)
    else:
        jsonFileName = "data" + "/" + path + ".json"
        with open(os.path.join("app/twitterlikepages/static/", jsonFileName)) as json_data:
            data  = json.load(json_data)
        return render(request, 'twittermain.html', {'loggedInUser': loggedInUser, 'loggedInUserName': 'Paritosh Das', 'currentUser': currentUser, 'data': json.dumps(data)})

