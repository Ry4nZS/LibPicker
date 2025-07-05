import random
from flask import Flask, jsonify, request
from Back.steam_api_handler import *
from dotenv import load_dotenv
import os
from datetime import datetime
app = Flask(__name__) # Cria uma aplicação flask com o nome do arquivo atual.
load_dotenv() # Carrega as variaveis de ambientes de teste para o código
steamid = os.getenv("steamid") # Pegando MEU steamid por enquanto

def montador_json(jogo):
    data = datetime.fromtimestamp(jogo['rtime_last_played'])
    data = data.strftime("%d/%m/%Y")
    appid = str(jogo['appid'])
    img_icon_url = str(jogo['img_icon_url'])
    img_url_montada = "http://media.steampowered.com/steamcommunity/public/images/apps/{}/{}.jpg".format(appid, img_icon_url)
    resposta_jogo = {
        "nome_jogo": jogo['name'],
        "tempo_de_jogo": jogo['playtime_forever'],
        "ultima_vez_jogado": data,
        "img_url_montada": img_url_montada,
        "appid": jogo['appid']
    }
    return resposta_jogo

#Sugerir um jogo aleatório que o usuário nunca jogou
@app.route('/nuncajogados')
def sugestao_nunca_jogado():
    jogos = pegar_jogos(steamid)
    jogos_filtrados = []
    for jogo in jogos:
        if jogo['playtime_forever'] == 0:
            jogos_filtrados.append(jogo)
    #Fazer verificação depois se existem jogos não jogados na biblioteca do usuário.
    jogo_escolhido = random.choice(jogos_filtrados)
    return montador_json(jogo_escolhido)
#Sugerir um jogo com pouco playtime (até 10 horas)
@app.route('/poucotempodejogo')
def sugestao_poucotempodejogo():
    # Fazer verificação depois se existem jogos na biblioteca do usuário.
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
    jogos = pegar_jogos(steamid)
    jogo_escolhido = random.choice(jogos)
    return montador_json(jogo_escolhido)

@app.route('/maisjogados')
def maisjogados():
    jogos = pegar_jogos(steamid)
    jogos_filtrados = []
    jogos.sort(key=lambda jogo: jogo['playtime_forever'], reverse=True)
    jogos_filtrados = jogos[:5]
    jogo_escolhido = random.choice(jogos_filtrados)
    return montador_json(jogo_escolhido)

#@app.route('/esquecidos')
#def esquecidos():
#    jogos = pegar_jogos(steamid)
#    jogos_filtrados = []
#    data_atual = datetime.now()
#    data_atual = data_atual.strftime("%d/%m/%Y")



app.run(port=5000,host='localhost',debug=True)