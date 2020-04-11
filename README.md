`TODO Usar web3 1.2.4 que es la versión utilizada en 0xcert framework.`

# TODO Crear un test que me permita realizar todas estas operaciones.


# Crear un asset

await xcert.instance.methods.create(bob, id, digest).send({ from: owner });

# Balance de una cuenta

const count = await xcert.instance.methods.balanceOf(bob).call();

# obtener el owner de un certificado

const ownerOfId1 =  await xcert.instance.methods.ownerOf(id1).call();

# transferir token

await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
const logs = await xcert.instance.methods.transferFrom(bob, sara, id1).send({ from: bob });

# safeTransfer
await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
const logs = await xcert.instance.methods.safeTransferFrom(bob, sara, id1).send({ from: bob });

# retorna el nombre
const symbol = await xcert.instance.methods.name().call();

# retorna el símbolo
const symbol = await xcert.instance.methods.symbol().call();

# retornar la uri
await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
let uri = await xcert.instance.methods.tokenURI(id1).call();

# retornar el id de un token por el índice
await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
const tokenIndex0 = await xcert.instance.methods.tokenByIndex(0).call();

# retornar el token de un propiertario según el indice
await xcert.instance.methods.create(bob, id1, digest1).send({ from: owner });
await xcert.instance.methods.create(bob, id2, digest2).send({ from: owner });
await xcert.instance.methods.create(sara, id3, digest3).send({ from: owner });

const tokenOwnerIndex1 = await xcert.instance.methods.tokenOfOwnerByIndex(bob, 1).call();

# retornar el imprint del token
await xcert.instance.methods.create(bob, id, digest).send({ from: owner });
const xcertId1Imprint = await xcert.instance.methods.tokenURIIntegrity(id).call();
ctx.is(xcertId1Imprint.digest, digest);

# Para analizar las actualizaciones, revocar, pausar y destruir analizar los test de cada uno de los ejemplos concretos.
Por ejemplo: https://github.com/0xcert/framework/blob/master/packages/0xcert-ethereum-xcert-contracts/src/tests/mutable-xcert.test.ts
