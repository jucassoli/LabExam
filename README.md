# LabExam API

API LabExam é uma aplicação NodeJs com Mongo DB que disponibiliza acessos a exames, laboratórios e associações entre eles.

## Installation

A aplicação esta preparada e pre configurada para ser instalada e executada em container Docker. Primeiro use o Git para baixar a aplicação do repositório.

```bash
git clone https://github.com/jucassoli/LabExam.git
```
Em seguida execute o docker-compose para construir o ambiente do container
```bash
docker-compose build
```
E para executar subir o servidor da aplicação com o MongDB execute
```bash
docker-compose up
```


## Usage
A aplicação vem com swagger embarcado para documentação, basta acessar com o browser com o endereço de instalação. (A porta padrão configurada é 8081)

```bash
http://localhost:8081
```

## Contributing
Não aberto a contribuição

## License
[MIT](https://choosealicense.com/licenses/mit/)