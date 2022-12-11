import requests
import json

# エンドポイント
url = 'https://api.a3rt.recruit.co.jp/text_summarization/v1'

# APIキー
key = 'DZZGpZZRXGUMzwo6OjZgzj4Xd6oxVEdS'


json_open = open('mail.json', 'r')
json_load = json.load(json_open)

ary = {}
for i in range(1,5):

    #要約する文章
    sentence = json_load["mail_"+str(i)]["body"]

    #パラメーターの設定
    params = {
        'sentences': sentence,
        'apikey': key,
        'linenumber': '1' #抽出文章数
    }

    #リクエスト
    res = requests.post(url, data=params)
    values = json.loads(res.text)
    print(values)
    ary["mail_"+str(i)] = values["summary"]

    # #レスポンスから要約されたテキストを取り出す
    # for summary in values["summary"]:
    #     print(summary)
    #     ary.append(summary)

print(ary)




with open('./summary.json', 'w') as f:
    json.dump(ary, f, ensure_ascii=False)