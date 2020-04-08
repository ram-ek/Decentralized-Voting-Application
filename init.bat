mkdir Blockchain
cd Blockchain
type null>genesis.json
@echo off
@echo { >genesis.json
@echo    "nonce": "0x0000000000000042", >>genesis.json
@echo    "timestamp": "0x00", >>genesis.json
@echo    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000", >>genesis.json
@echo    "extraData": "0x00", >>genesis.json
@echo    "gasLimit": "0x8000000", >>genesis.json
@echo    "difficulty": "0x200", >>genesis.json
@echo    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000", >>genesis.json
@echo    "coinbase": "0x3333333333333333333333333333333333333333", >>genesis.json
@echo    "alloc": { }, >>genesis.json
@echo    "config": { >>genesis.json
@echo		 "chainId": 15, >>genesis.json
@echo        "homesteadBlock": 0, >>genesis.json
@echo        "eip150Block": 0, >>genesis.json
@echo		 "eip155Block": 0, >>genesis.json
@echo        "eip158Block": 0, >>genesis.json
@echo        "ByzantiumBlock": 0 >>genesis.json
@echo    } >>genesis.json
@echo } >>genesis.json
geth --datadir "./node" init "./genesis.json"