const XcertMock = artifacts.require("XcertMock");

// se inicia el sc con las capacidades de revocar, actualizar y pausar transferencias
module.exports = function(deployer, network, accounts) {
    deployer.deploy(XcertMock,
        'Academic Certificate Asset',
        'ACA',
        'http://academiccertificateasset.com/xcerts/',
        '.json',
        '0x292e4a1a4c1f74c57ff6c2b180f9f2be5ab1346dfa692c03e4c74ed541417b23', ['0x0d04c3b8', '0xbedb86fb', '0x20c5429b'], { from: accounts[0] }
    );
};

/**
 *
  bytes4 constant MUTABLE = 0x0d04c3b8;
  bytes4 constant BURNABLE = 0x9d118770;
  bytes4 constant PAUSABLE = 0xbedb86fb;
  bytes4 constant REVOKABLE = 0x20c5429b;
 */