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
- **Google Maps Geocode API** (cálculo de coordenadas)
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

## 🧪 Rodar os Testes

```bash
# Executar todos os testes unitários
$ npm run test

# Executar todos os testes unitários em modo watch
$ npm run test:watch

# Ver cobertura de testes
$ npm run test:cov
```

---

## 📌 Estrutura do Projeto

src/  
│  
├── modules/  
│   └── store/    
│       ├── repository/  
│       ├── dtos/  
│       ├── interfaces/  
│       └── specs/  
│  
├── schemas/  
├── shared/  
│   ├── integrations/  
│  
├── main.ts  
└── app.module.ts  

---

## 📚 Documentação da API

A documentação da API está disponível via Swagger:

    Após rodar o projeto, acesse: http://localhost:<PORT>/api

---

## 🔍 Principais Endpoints

    POST /api/stores — Cria uma nova loja

    GET /api/stores — Lista todas as lojas com paginação

    GET /api/stores/:id — Busca loja por ID

    GET /api/stores/state/:state — Filtra lojas por estado

    GET /api/stores/nearby/:cep — Retorna lojas com opções de fretes com base no Cep requisitado
