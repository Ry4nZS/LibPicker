import requests
from dotenv import load_dotenv
import os

load_dotenv()
KEY = os.getenv("KEY") # Chave da Steam API


# Literalmente pegando os jogos da biblioteca do steamid selecionado via API steam.
def pegar_jogos (steamid):
    url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+ KEY +"&steamid="+ steamid +"&format=json&include_appinfo=true"
    resposta = requests.get(url) #Response != de dicionário
    data = resposta.json() #Transforma o JSON bruto em dict
    #precisa verificar se a lista retornou alguma coisa também
    if resposta.status_code == 200:
        lista_jogos = data["response"].get("games") # data["response"]["games"] é uma LISTA de dicionários
        if lista_jogos is None:
            return "Não foram encontrados jogos."
        else:
            return lista_jogos
    else:
        return "Ocorreu algum erro! tente novamente."
