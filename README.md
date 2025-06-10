# BlockchainVoteSystem

> Un sistema de votación basado en chaincode de Hyperleder Fabric, que incluye despliegue de contrato, API backend en Node.js e interfaz frontend.

## Estructura del proyecto

### Frontend
- **assets/**: Recursos estáticos (iconos, imágenes, etc.)  
- **html/**, **css/**: Páginas y estilos del frontend para votar y mostrar resultados  
### Blockchain
- **blockchain/**: Código Solidity de los contratos inteligentes, que definen la lógica de votación y evitan votos duplicados  

- **scripts/**: Scripts para crear la blockchain y levantarla. Además de la estructura de la base de datos  
- **src/**: Backend en Node.js con Express, que expone una API REST y se comunica con la blockchain  
- **.env.example**: Ejemplo de variables de entorno 
- **docker-compose.yml**: Configuración de Docker Compose para levantar postgres (base de datos de usuarios)
- **package.json**: Dependencias del proyecto

## Funcionalidades

1. **Despliegue de contrato inteligente**  
   - Cración y configuración de blockchain local con docker
   - Despliega el contrato de votación en blockchain
2. **API REST**
    - **2.1 Usuarios**
        - `POST /api/users/register`: registra un usuario
        - `POST /api/users/login`: autentica a un usuario
    - **2.1 Votos**
        - `POST /api/votes/`: emite un voto el usuario registrado
        - `GET /api/votes`: devuelve todos los votos de la blockchain
4. **Interfaz frontend**  
   - Creación de usuario y login
   - Muestra los candidatos y permite votar  
   - Gráfico de votos y contador de votos en tiempo real  


## Puesta en marcha rápida
   ```bash
   git clone https://github.com/mja123/BlockchainVoteSystem.git
   cd BlockchainVoteSystem/scripts
   ./run_blockchain.sh
   cd ..
   docker_compose up -d
   node src/index.js
   ```
   
