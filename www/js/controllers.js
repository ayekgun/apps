angular.module('starter.controllers', ['chart.js','ionic','ionic-color-picker'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout , $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
  // Triggered in the login modal to close it

  $scope.closeLogin = function() {
    $scope.loginModal.hide();
    $ionicPopup.alert({
              title: 'Success',
              content: 'Anda Berhasil Hello World!!!'
            }).then(function(res) {
              console.log('Test Alert Box');
            });    
  };

  

  
  // Create the login modal that we will use later
  
  
  //*******************************************************************************************
  //* end proses pengeluaran

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
      $scope.loginModal.remove();
      $scope.pengeluaranModal.remove();
      $scope.pemasukanModal.remove();
      $scope.tambahModal.remove();

  });


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'makan', jumlah: 2000, id: 1 },
    { title: 'minum', jumlah: 2000, id: 2 },
    { title: 'ngopi', jumlah: 2000, id: 3 },
    { title: 'burjo', jumlah: 2000, id: 4 },
    { title: 'Rap',   jumlah: 0, id: 5 },
    { title: 'Cowbe', jumlah: null, id: 6 }
  ];
})

.controller('tambahCtrl',function($scope, $ionicModal, $timeout , $ionicPopup){
$ionicModal.fromTemplateUrl('templates/tambah.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.tambahModal = modal;
  });
  // Open the login modal
  $scope.tambah = function() {
    $scope.tambahModal.show();
  };

  // Triggered in the login modal to close it
  $scope.closeTambah = function() {
    $scope.tambahModal.hide();    
    
  };
   $scope.$on('$destroy', function() {      
      $scope.tambahModal.remove();
  });

})


.controller('PlaylistCtrl', function($scope, $stateParams) {
})

  //color pic
.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.testColors = {
     first : null,
     second : null,
     third : null
  }

  $scope.customColors = {
    "redcanaglia" : "#ff0000",
    "canaryblue" : "#33ffff"
  }
  
}])
.controller('pemasukanCtrl',function($scope,$http, $ionicModal, $timeout , $ionicPopup, $cordovaSQLite, $stateParams){

  $scope.pemasukanData = {tabung : 0};
  // $http.get(url).success(function(data){
  //    $scope.data = data; // get row data
  //    $scope.data.tanggal = new Date($scope.data.tanggal); // convert filed to date
  //     });
  //$scope.pemasukanData.tanggal = new Date($scope.pemasukanData.tanggal);

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/pemasukan/pemasukan.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.pemasukanModal = modal;
  });

  $scope.showAddChangeDialog = function(action) {
        $scope.action = action;
        $scope.pemasukanModal.show();
      };  

  // Open the login modal
  $scope.pemasukan = function(action) {    
    $scope.showAddChangeDialog('add');
    //$scope.pemasukanModal.show();
  };

  // Triggered in the login modal to close it
  $scope.closePemasukan = function() {
    $scope.pemasukanModal.hide();   
  };

  $scope.getPemasukan = function(id) {

        var dataDetil= [];        
        var query = "SELECT * FROM pemasukan where id ="+id;
        var data =  $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {                
                for(i=0;i<res.rows.length;i++){
                    dataDetil = res.rows.item(i);          
                }                
                $scope.pemasukanData = dataDetil;                
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
        $scope.showAddChangeDialog('change');
        //$scope.pemasukanModal.show();
    };
    
    //db.transaction(updateRecord, errorDB, successDB);

  $scope.doUpdatePemasukan = function(){
    var data = $scope.pemasukanData;    
    var dataDetil = [];
    var query = "INSERT OR REPLACE INTO pemasukan (id, jumlah, toggle, tabung, tanggal)" + "VALUES (?,?,?,?,?)";
    //var query = "UPDATE pemasukan SET (jumlah, toggle, tabung, tanggal) VALUES (?,?,?,?) where id ="+id;
    var data =  $cordovaSQLite.execute(db, query , [data.id, data.jumlah, data.toggle, data.tabung, data.tanggal]).then(function(res) {
            if(res.rows.length > 0) {                
                for(i=0;i<res.rows.length;i++){
                    dataDetil = res.rows.item(i);          
                }                
                $scope.pemasukanData = dataDetil;                
            } else {
                console.log("No results found");
            }
            var query = "SELECT * FROM pemasukan order by id desc";
                var data =  $cordovaSQLite.execute(db, query).then(function(res) {
                    if(res.rows.length > 0) {                
                        for(i=0;i<res.rows.length;i++){
                            data[i] = res.rows.item(i);          
                        }                
                        $scope.pemasukans =data;
                        //$scope.pemasukanData = { nama_pemasukan: '', jumlah: '',keterangan:'' };                        
                    } else {
                        console.log("No results found");
                    }
                }, function (err) {
                    console.error(err);
                });
                $scope.pemasukanModal.hide();            
        }, function (err) {
            console.error(err);
        });

  };
  // $scope.doDeletePemasukan = function (id){
  //   var index = getSelected index

  // };
  
  // // Fungsi simpan pemasukan
  // $scope.doSavePemasukan = function() {
  //   console.log('Data pemasukan', $scope.pemasukanData);    
  //   $ionicPopup.alert({
  //             title: 'Success',
  //             content: 'Simpan Berhasil!'
  //           }).then(function(res) {
  //             console.log('Test Alert Box');
  //           });
  //   $scope.pemasukanModal.hide();

  // };
  //Fungsi Select Pemasukan
  var query = "SELECT * FROM pemasukan order by id desc";
        var data =  $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                //console.log("SELECTED -> " + res.rows.item(0).nama_pemasukan + " " + res.rows.item(0).jumlah);                
                for(i=0;i<res.rows.length;i++){
                    data[i] = res.rows.item(i);
                }                
                $scope.pemasukans = data;                
            }
            else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });

   if($stateParams.pemasukanId){
        var dataDetil= [];
        var id = $stateParams.pemasukanId;           
        var query = "SELECT * FROM pemasukan where id ="+id;
        var data =  $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {                
                for(i=0;i<res.rows.length;i++){
                    dataDetil = res.rows.item(i);          
                }                
                $scope.pemasukanDetil = dataDetil;
                console.log($scope.pemasukanDetil);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
  else{
        console.log('params not found');
    }

// $scope.select = function() {     
//         console.log($stateParams.pemasukanId);
//         var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
//         $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
//             if(res.rows.length > 0) {
//                 console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
//             } else {
//                 console.log("No results found");
//             }
//         }, function (err) {
//             console.error(err);
//         });
//     }

$scope.doSavePemasukan = function() {        
            var data = $scope.pemasukanData;
            var query = "INSERT INTO pemasukan (jumlah, toggle, tabung, tanggal) VALUES (?,?,?,?)";
            $cordovaSQLite.execute(db, query, [data.jumlah, data.toggle, data.tabung, data.tanggal]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
                var alertPopup = $ionicPopup.alert({
                    title: 'Success',
                    template: 'data '+res.insertId+' berhasil disimpan'
                });
                var query = "SELECT * FROM pemasukan order by id desc";
                var data =  $cordovaSQLite.execute(db, query).then(function(res) {
                    if(res.rows.length > 0) {                
                        for(i=0;i<res.rows.length;i++){
                            data[i] = res.rows.item(i);          
                        }                
                        $scope.pemasukans =data;
                        //$scope.pemasukanData = { nama_pemasukan: '', jumlah: '',keterangan:'' };                        
                    } else {
                        console.log("No results found");
                    }
                }, function (err) {
                    console.error(err);
                });
                $scope.pemasukanModal.hide();    
            }, function (err) {
                console.error(err);
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'data gagal disimpan'
                });
            });
    };
  
  $scope.$on('$destroy', function() {       
      $scope.pemasukanModal.remove();
   });  
  
  // $scope.playlists = [
  //   { title: 'makan', jumlah: 2000, id: 1 },
  //   { title: 'minum', jumlah: 2000, id: 2 },
  //   { title: 'ngopi', jumlah: 2000, id: 3 },
  //   { title: 'burjo', jumlah: 2000, id: 4 },
  //   { title: 'Rap',   jumlah: 0, id: 5 },
  //   { title: 'Cowbe', jumlah: null, id: 6 }
  // ];

})

.controller('pengeluaranCtrl',function($scope, $ionicModal, $timeout , $ionicPopup){
  $scope.pengeluaranData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/pengeluaran/pengeluaran.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.pengeluaranModal = modal;
  });
  
  // Open the login modal
  $scope.pengeluaran = function() {
    $scope.pengeluaranModal.show();
  };

  // Triggered in the login modal to close it
  $scope.closePengeluaran = function() {
    $scope.pengeluaranModal.hide();    
  };

  
  // Perform the login action when the user submits the login form
  
  $scope.playlists = [
    { title: 'makan', jumlah: 2000, id: 1 },
    { title: 'minum', jumlah: 2000, id: 2 },
    { title: 'ngopi', jumlah: 2000, id: 3 },
    { title: 'burjo', jumlah: 2000, id: 4 },
    { title: 'Rap',   jumlah: 0, id: 5 },
    { title: 'Cowbe', jumlah: null, id: 6 }
  ];

})
.controller('grafikCtrl',function($scope){
  //donat grafik
  $scope.labelsA = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.dataA = [65, 59, 80, 81, 56, 55, 40];

})
.directive("formatDate", function(){
  return {
   require: 'ngModel',
    link: function(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function(modelValue){
        return new Date(modelValue);
      })
    }
  }
})

.filter('dates', function($filter){
   return function(input){
    if(input == null){ return ""; } 
   
    var _date = $filter('date')(new Date(input), 'dd MMM yyyy');
   
    return _date.toUpperCase();

   };
  })

// .filter('tetap', function($filter){
//    return function(input){
//     if(input == false){ return "tetap"; }
//     var _tetap = $filter('tetap')(new toggle(input), 'tetap');
   
//     return _tetap.toUpperCase();    
    
//    };
//   })

.controller('forecastCtrl',function($scope, $ionicModal, $timeout , $ionicPopup){
  //forecast grafik
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ]; 

});