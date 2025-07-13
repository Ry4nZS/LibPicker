
# LibPicker

LibPicker é uma aplicação web que conecta com a API da Steam para sugerir jogos da sua biblioteca com base em filtros personalizados como jogos nunca jogados, pouco jogados ou aleatórios.

Backend em Python (Flask) com criação de API própria e frontend em React + Vite.
Ideal para quem tem muitos jogos e não sabe por onde começar!


## Stack utilizada

**Front-end:** React, TypeScript, Vite

**Back-end:** Python, Flask, Flask-CORS, Steam Web API


## Documentação da API

#### Retorna o username com base no steamID64 do usuário.

```http
  GET /username
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `steamid` | `string` | **Obrigatório**. Usar o steamID64 da sua conta. |

#### Sorteia um jogo aleatório dentre todos os jogos nunca jogados da biblioteca do steamID64 fornecido.

```http
  GET /nuncajogados
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `steamid`      | `string` | **Obrigatório**. Usar o steamID64 da sua conta. |

#### Sorteia um jogo aleatório dentre todos os jogos com pouco playtime (até 10 horas) biblioteca do steamID64 fornecido.

```http
  GET /poucotempodejogo
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `steamid`      | `string` | **Obrigatório**. Usar o steamID64 da sua conta. |

#### Sorteia um jogo aleatório dentre todos os jogos (incluindo os grátis) da biblioteca do steamID64 fornecido.

```http
  GET /sorteiotodos
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `steamid`      | `string` | **Obrigatório**. Usar o steamID64 da sua conta. |

#### Sorteia um jogo aleatório dentre os cinco jogos mais jogados da biblioteca do steamID64 fornecido.

```http
  GET /maisjogados
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `steamid`      | `string` | **Obrigatório**. Usar o steamID64 da sua conta. |

#### Sorteia um jogo que não foi jogado em 6 meses e o usuário tem mais de 5 horas de jogo.

```http
  GET /esquecidos
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `steamid`      | `string` | **Obrigatório**. Usar o steamID64 da sua conta. |



## Autores

- [@Ryan](https://www.github.com/Ry4nZS)
- [@Vininic](https://github.com/Vininic)

