import random
from flask import Flask, jsonify, request
from Back.steam_api_handler import *
from dotenv import load_dotenv
import os
app = Flask(__name__) # Cria uma aplicação flask com o nome do arquivo atual.
load_dotenv()
steamid = os.getenv("steamid") # Pegando MEU steamid por enquanto

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
    return jogo_escolhido
#Sugerir um jogo com pouco playtime (até 10 horas)
@app.route('/poucotempodejogo')
def sugestao_poucotempodejogo():
    # Fazer verificação depois se existem jogos na biblioteca do usuário.
    jogos = pegar_jogos(steamid)
    jogos_filtrados = []
    for jogo in jogos:
        if jogo['playtime_forever'] > 0 and jogo['playtime_forever'] <= 600:
            jogos_filtrados.append(jogo)
    jogo_escolhido = random.choice(jogos_filtrados)
    return jogo_escolhido

#Sorteio dentre todos os jogos incluindo os grátis
@app.route('/sorteiotodos')
def sorteiotodos():
    jogos = pegar_jogos(steamid)
    jogo_escolhido = random.choice(jogos)
    return jogo_escolhido

app.run(port=5000,host='localhost',debug=True)