//  Values of total number of candidates needs to taken form db
    // Load the value in a variable 
    // Then pass that variable as an argument for Dynamic_Cards funtion
    // Each Candidate Detail must also be loaded from the DB
    // 


    // var x = document.referrer;    
    // if (x == "vote.html") {
    //     console.log(x);
    // } else {
    //     window.location.href = "index.html";
    // };


    // if(typeof web3 !== 'undefined') {
    //     web3 = new Web3(web3.currentProvider);
    //   } else {

      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      // }
      
      web3.eth.getAccounts(console.log);
      web3.eth.getAccounts().then(function(res){
        // console.log(res);
        web3.eth.defaultAccount = res[0];
        console.log(web3.eth.defaultAccount);
      });
      
      
      var abi = [{"constant":true,"inputs":[],"name":"candidatesCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"year","type":"string"},{"name":"branch","type":"string"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_year","type":"string"},{"name":"_branch","type":"string"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_candidateId","type":"uint256"}],"name":"deleteCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_candidateId","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
      
      var address = "0xd7b229B8D2258b5229a693Aaa3de475c2cEf0434";
      
      var con = new web3.eth.Contract(abi, address);
      
      
    //   con.methods.candidates(1).call({from: web3.eth.defaultAccount}, function(err, res){
    //     if(!err){
    //       console.log(res);
    //     } else {
    //       console.log(err);
    //     }
    //   });

    var canCount;

    con.methods.candidatesCount().call({from: web3.eth.defaultAccount}, function(err, res){
        if (!!err) {
            console.log(err);

        } else{
            // console.log("#"+res);
            canCount = res;
            for (var i=1; i<=canCount; i++) {    
              // console.log("Inside dynamic");   
              // console.log(web3.defaultAccount); 
              con.methods.candidates(i).call({from: web3.eth.defaultAccount}, function(err, res){
                  // console.log(res);
                  var myPanel = $('<div class="card text-center border-primary"><img class="card-img-top" src="images/icon1.png" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+res[1]+'</h5><p class="card-text">'+res[2]+' - '+res[3]+'</p><a href="#" class="btn btn-success" id='+res[0]+' onclick="reply_click(this.id)">Vote</a></div></div>');
                  myPanel.appendTo('#controlpanel');
              });     
            }
        }
    });

    // console.log("hi");
    
     
     function reply_click(clicked_id){
       // Variable candidateId contains the id of the candidate that was voted for
        var canId = clicked_id
       
        window.location.replace("./thankyou.html");
        console.log('The Clicked ID is '+canId);
        // console.log(web3.eth.defaultAccount);
        con.methods.vote(canId).send({from: web3.eth.defaultAccount}, function(err, res){
          console.log("voted");
          if(err) {
          console.log(err);
          } else{
            console.log(res);
          }
        });
        
     }
    