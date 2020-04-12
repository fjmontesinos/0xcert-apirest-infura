# 0xcert Framework API Rest vía Infura

El objetivo de este proyecto es crear un proyecto base que permita interactuar con un Xcert de 0xcert Framework desplegado sobre una red remota como Rinkeby, Ropsten o incluso Mainnet mediante un API Rest desarrollada con Express.

Podremos desplegar nuestro propio Xcert en Ganache o incluso en una red remota que puede ser
Mainnet, Ropsten o Rinkeby.

Se ha optado por realizar esta implementación para poder utilizar como provider Infura dado que actualmente 0xcert tan solo lo contempla
para realizar consultas y no para ejecutar transacciones (mutations en el lenguaje de 0xcert) con lo que la posibilidad de emitir transacciones por ejemplo en Mainnet pasaría por:
 1. Usar el API 0xcert mediante la adquisición de sus tokens o bien.
 2. Disponiendo de un nodo de esa red al que poder conectar nuestra API.

Con esto conseguiremos tener una API Rest a la cual podremos llamar desde otros servicios o procesos internos para implementar de una forma sencilla la generación de certificados.

En este guía se recogen:

 * [Como desplegar nuestro XCert sobre Rinkeby](#deploy-xcert)
 * [Como desplegar nuestra API Rest conectada a Rinkeby](#deploy-apirest)
 * [Como interactuar con nuestra API Rest](#use-apirest)

## <a name="deploy-xcert"></a>1. Desplegar nuestro Xcert sobre Rinkeby

En el smart contract `contracts/XcertMock.sol` se define un prototipo de certificado que es el mismo utilizado por 0xcert al implementar el uso de su framework tal como se describe en los ejemplos descritos como ayuda, p.e. [0xcert-manage-assets-example](https://codesandbox.io/s/0xcert-manage-assets-example-7hy86)

A continuación se describe como desplegar sobre Rinkeby el sc XcertMock.sol, el ejemplo descrito con Infura es para Rinkeby pero se puede sustituir
por cualquier otra red como Ropsten o la propia Mainnet sin más que realizar la configuración del network necesario.

### 1.1. Configurar el Asset Ledger

Lo primero que deberemos realizar es configurar el Asset Ledger en su despliegue con la configuración deseada desde el fichero `migrations/2_xcert_mock.js`

 * string memory _name, nombre del Asset Ledger, p.e.: Academic Certificate Asset
 * string memory _symbol, símbolo de los tokens, p.e.: ACA
 * string memory _uriPrefix, prefijo de la url desde la que se podrá consultar metadatos del token, p.e.: http://academiccertificateasset.com/xcerts/
 * string memory _uriPostfix, sufijo para construir la url de acceso al token, p.e.: .json
 * bytes32 _schemaURIIntegrityDigest, schema id del schema asociado a los assets que se almacenarán, p.e. el schema id asociado al schema recogido en `schemasschema_academic_certificate.js` Para obtener el schemaId se puede utilizar la funcionalidad que 0xcert ofrece meidante Cert.identify() en el paquete 0xcert/cert.
 * bytes4 constant MUTABLE = 0x0d04c3b8; - Esta opción permitirá al propieatario del sc y usuarios autorizados actualizar los tokens generados
 * bytes4 constant BURNABLE = 0x9d118770; - Esta opción permitirá al propiartio del token y usuarios autorizados a destruir el token.
 * bytes4 constant PAUSABLE = 0xbedb86fb; - Esta opción permitirá al propietario del sc y usuarios autorizados a pausar la transferencia de tokens.
 * bytes4 constant REVOKABLE = 0x20c5429b; - Esta opción permitirá al propietario del sc y usuarios autorizados a revocar tokens emitidos.

### 1.2. Configurar despliegue con Infura

Para realizar el despliegue con Infura necesitaremos configurar en un fichero secrets.json que debe estar en el raíz del proyecto un mnemonic y el project ID de Infura. A modo de ejemplo se dispone del fichero `secrets-conf.json` realizando una copia y renombrando esta como `secrets.json` no tendremos más que sustituir las variables `YOUR_MNEMONIC` y `YOUR_INFURA_PROJECT_ID` por tus valores concretos:

```json
{
    "mnemonic": "<YOUR_MNEMONIC>",
    "infuraProjectID": "<YOUR_INFURA_PROJECT_ID>"
}
```

### 1.3. Optimizar el coste del despliegue

Para optimizar el coste del despliegue de estos smart contracts y de las operaciones que por ejemplo se puedan realizar desde truffle console se ha configurado el **precio del gas** en: **1.1 Gwei** tal como se puede verificar en el fichero `truffle-config.js`

### 1.4. Desplegar

Para desplegar no tendremos más que compilar y realizar el despliegue indicando la red en la que queremos ejecutarlo:

```console
$ truffle compile
$ truffle migrate --network rinkeby
```

Una vez desplegado correctamente podremos verificar correctamente la información de las transacciones realizadas desde [Etherscan sobre Rinkeby](https://rinkeby.etherscan.io)

### 1.5. Interacutar con nuestro Xcert mediante Truffle Console

Una vez desplegados nuestros sc podemos interactuar de una forma sencilla utilizando truffle console.

Iniciamos la consola mediante:

```console
$ truffle console --network rinkeby
```

Instanciamos el SC del Xcert creado utilizando su dirección:

```console
truffle(rinkeby)>  let x = await XcertMock.at('direccion_del_sc')
```

Creamos un token con id = 1 e imprint 0x0000000000000000000000000000000000000000000000000000000000000000 para probar:

```console
truffle(rinkeby)>  await x.create('direccion_receptora', 1, '0x0000000000000000000000000000000000000000000000000000000000000000')
```

Ahora ya podemos verificar el propetario del token 1, el balance de la cuenta direccion_receptora, transferirlo, revocarlo o actualizarlo:

```console
truffle(rinkeby)>  await x.ownerOf(1)
truffle(rinkeby)>  await x.balanceOf('direccion_receptora')
truffle(rinkeby)>  await x.transferFrom('direccion_receptora', 'direccion_receptora2', 1)
truffle(rinkeby)>  await x.revoce(1)
```

### 1.6. Otros ejemplos de interacción con nuestro Xcert mediante Truffle Console

A continuación se recogen ejemplos de operaciones con el token.

#### Crear un asset

await xcert.instance.methods.create(bob, id, digest).send({ from: owner });

#### Balance de una cuenta

const count = await xcert.instance.methods.balanceOf(bob).call();

#### obtener el owner de un certificado

const ownerOfId1 =  await xcert.instance.methods.ownerOf(id1).call();

#### transferir token

await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
const logs = await xcert.instance.methods.transferFrom(bob, sara, id1).send({ from: bob });

#### safeTransfer
await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
const logs = await xcert.instance.methods.safeTransferFrom(bob, sara, id1).send({ from: bob });

#### retorna el nombre del asset ledger
const symbol = await xcert.instance.methods.name().call();

#### retorna el símbolo del asset ledget
const symbol = await xcert.instance.methods.symbol().call();

#### retornar la uri de un token
await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
let uri = await xcert.instance.methods.tokenURI(id1).call();

#### retornar el id de un token por el índice
await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
const tokenIndex0 = await xcert.instance.methods.tokenByIndex(0).call();

#### retornar el token de un propiertario según el indice
await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
await xcert.instance.methods.create(bob, id2, digest2).send({ from: owner });
await xcert.instance.methods.create(sara, id3, digest3).send({ from: owner });

const tokenOwnerIndex1 = await xcert.instance.methods.tokenOfOwnerByIndex(bob, 1).call();

#### retornar el imprint del token
await xcert.instance.methods.create(bob, id, digest).send({ from: owner });
const xcertId1Imprint = await xcert.instance.methods.tokenURIIntegrity(id).call();
ctx.is(xcertId1Imprint.digest, digest);

#### Otras operaciones

Para analizar las actualizaciones, revocar, pausar y destruir analizar los test de cada uno de los ejemplos concretos. Por ejemplo: https://github.com/0xcert/framework/blob/master/packages/0xcert-ethereum-xcert-contracts/src/tests/mutable-xcert.test.ts

## <a name="deploy-apirest"></a>2. Desplegar nuestra API REST Express

**En elaboración.**

`TODO Usar web3 1.2.4 que es la versión utilizada en 0xcert framework.`

## <a name="use-apirest"></a>3. API REST

**En elaboración.**