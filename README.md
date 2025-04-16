# 📦 Physical Store - Desafio 3 Compass

## Descrição

Esta é uma API desenvolvida em **NestJS** com **MongoDB**, focada em performance e boas práticas, que permite consultar lojas próximas com base em um **CEP** e retornar os possíveis **métodos de entrega** disponíveis.

A lógica da aplicação:

- Proximidade entre o CEP informado e as lojas cadastradas.
- Entrega própria via **PDV** quando a distância é até **50km**, com taxa fixa.
- Alternativa de frete via **Correios** (Sedex e PAC) para lojas mais distantes.
- Integração com serviços externos como **Google Maps**, **ViaCEP** e **Melhor Envio** para calcular **distância, tempo e preço de entrega**.

O projeto consiste em desenvolver uma **estimativa de frete eficiente** baseado na geolocalização do cliente.

---

## 🚀 Tecnologias Utilizadas

- **NestJS** + **Node.js**
- **TypeScript**
- **MongoDB** com **Mongoose**
- **Google Maps Routes API** (cálculo de distância)
- **ViaCEP API** (busca de endereço pelo CEP)
- **Melhor Envio API** (valores e prazos de Sedex e PAC)
- **Swagger** para documentação
- **Jest** para testes unitários
- Padrões: **SOLID**, **Clean Code**

---

## 🔧 Instalação

```bash
# Clonar o repositório
$ git clone https://github.com/lucashrv/desafio_3.git

# Instalar as dependências
$ npm install
```

---

## ▶️ Rodar a aplicação

```bash
# Em modo de desenvolvimento
$ npm run start:dev

# Em modo de produção
$ npm run start:prod
```

---

## 📌 Estrutura do Projeto
