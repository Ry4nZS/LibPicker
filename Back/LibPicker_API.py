import random
from flask import Flask, jsonify, request
from Back.steam_api_handler import *
from dotenv import load_dotenv
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__) # Cria uma aplicação flask com o nome do arquivo atual.
CORS(app)

def montador_json(jogo):
    data = datetime.fromtimestamp(jogo['rtime_last_played'])
    data = data.strftime("%d/%m/%Y")
    appid = str(jogo['appid'])
    img_url_montada = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{}/library_600x900.jpg".format(appid) # Tá pegando img do steamDB
    resposta_jogo = {
        "nome_jogo": jogo['name'],
        "tempo_de_jogo": jogo['playtime_forever'],
        "ultima_vez_jogado": data,
        "img_url_montada": img_url_montada,
        "appid": jogo['appid'],
    }
    return resposta_jogo

@app.route('/username')
def pegar_username():
    steamid = request.args.get("steamid")
    url = f"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={KEY}&steamids={steamid}"
    resposta = requests.get(url)
    data = resposta.json()
    nome = data["response"]["players"][0]["personaname"]
    return jsonify({"username": nome})

#Sugerir um jogo aleatório que o usuário nunca jogou
@app.route('/nuncajogados')
def sugestao_nunca_jogado():
    steamid = request.args.get("steamid")
    jogos = pegar_jogos(steamid)
    jogos_filtrados = []
    for jogo in jogos:
        if jogo['playtime_forever'] == 0:
            jogos_filtrados.append(jogo)
    jogo_escolhido = random.choice(jogos_filtrados)
    return montador_json(jogo_escolhido)

#Sugerir um jogo com pouco playtime (até 10 horas)
@app.route('/poucotempodejogo')
def sugestao_poucotempodejogo():
    steamid = request.args.get("steamid")
    jogos = pegar_jogos(steamid)
    jogos_filtrados = []
    for jogo in jogos:
        if jogo['playtime_forever'] > 0 and jogo['playtime_forever'] <= 600: # O playtime é medido em minutos
            jogos_filtrados.append(jogo)
    jogo_escolhido = random.choice(jogos_filtrados)
    return montador_json(jogo_escolhido)

#Sorteio dentre todos os jogos incluindo os grátis
@app.route('/sorteiotodos')
def sorteiotodos():
    steamid = request.args.get("steamid")
    jogos = pegar_jogos(steamid)
    jogo_escolhido = random.choice(jogos)
    return montador_json(jogo_escolhido)

@app.route('/maisjogados')
def maisjogados():
    steamid = request.args.get("steamid")
    jogos = pegar_jogos(steamid)
    jogos_filtrados = []
    jogos.sort(key=lambda jogo: jogo['playtime_forever'], reverse=True)
    jogos_filtrados = jogos[:5]
    jogo_escolhido = random.choice(jogos_filtrados)
    return montador_json(jogo_escolhido)

@app.route('/esquecidos')
def esquecidos():
    steamid = request.args.get("steamid")
    jogos = pegar_jogos(steamid)
    jogos_filtrados = []
    for jogo in jogos:
        ultima_vez_jogado = datetime.fromtimestamp(jogo['rtime_last_played'])
        if ultima_vez_jogado <= datetime.now() - timedelta(days=180) and jogo['playtime_forever'] > 300: #Seleciona um jogo que não foi jogado em 6 meses e tem mais de 5 horas de jogo
            jogos_filtrados.append(jogo)
    return montador_json(random.choice(jogos_filtrados))

app.run(port=5000,host='localhost',debug=True)