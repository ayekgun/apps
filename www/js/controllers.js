angular.module('starter.controllers', ['chart.js','ionic','ionic-color-picker'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout , $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {    
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it

  
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


.controller('popoverCtrl', function($scope, $ionicPopover) {

  // .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
})

.factory("items", function(){
  var items = {};
  items.isi=[
    { title: 'makan', jumlah: 2000, id: 1 },
    { title: 'minum', jumlah: 2000, id: 2 },
    { title: 'ngopi', jumlah: 2000, id: 3 },
    { title: 'burjo', jumlah: 2000, id: 4 },
    { title: 'Rap',   jumlah: 0, id: 5 },
    { title: 'Cowbe', jumlah: null, id: 6 }
  ];
  return items;
})

.controller('PlaylistsCtrl', function($scope, items) {
  $scope.items = items;
  $scope.addItem = function (index) {
        items.isi.push({            
            title: $scope.newItemName
        });
    }
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
.controller('MainCtrl', function($scope,$http, $ionicModal, $timeout , $ionicPopup, $cordovaSQLite, $stateParams){
    $scope.doSaveKategori = function() {            

            var data = $scope.kategoriData;
            //var data2 = $scope.datas;
            var query = "INSERT INTO kategori (nama) VALUES (?)";
            $cordovaSQLite.execute(db, query, [data.nama]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
                var alertPopup = $ionicPopup.alert({
                    title: 'Success',
                    template: 'data '+res.insertId+' berhasil disimpan'
                });
                var query = "SELECT * FROM kategori order by id desc";
                var data =  $cordovaSQLite.execute(db, query).then(function(res) {
                    if(res.rows.length > 0) {                
                        for(i=0;i<res.rows.length;i++){
                            data[i] = res.rows.item(i);          
                        }                
                        $scope.kategoris =data;                                                
                    } else {
                        console.log("No results found");
                    }
                }, function (err) {
                    console.error(err);
                });
                    
            }, function (err) {
                console.error(err);
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'data gagal disimpan'
                });
                
            });
    };

  // $scope.kategori = {
  //    first : null,
  //    warna : null,
  //    third : null
  // };

  // $scope.customColors = {
  //   "redcanaglia" : "#ff0000",
  //   "canaryblue" : "#33ffff"
  // };
})

.controller('grafikCtrl',function($scope,$ionicModal, $ionicPopup,$cordovaSQLite,$state,$stateParams){
      $scope.showchart=true;
      $scope.hidechart=false;
       var labels = [];
       var datas = [];
       var tang = [];
     
  $scope.getGrafik = function(){
      var queryTgl = "SELECT sum(jumlah) as jumlah, tabung, substr(tanggal, 9, 7) as tanggal FROM pemasukan group by tanggal";
       var query = "SELECT jumlah, tabung FROM pemasukan";
       var data =  $cordovaSQLite.execute(db, queryTgl).then(function(res) {
           if(res.rows.length > 0) {                
               for(i=0;i<res.rows.length;i++){                    
                   labels[i] = res.rows.item(i).jumlah;                                                        
                   datas[i] = res.rows.item(i).tanggal;
               }                
               console.log(labels);               
               console.log("my datas "+datas);
           } else {
               console.log("No results found");
           }
       }, function (err) {
           console.error(err);
       });

  };  

  $scope.getGrafik();
  $scope.onClick = function (points, evt) {
    console.log(points);
    // console.log(points[0]['value']);      
    // $location.path('app.detilbulan');
    $state.go('app.detilbulan');
  };

  

  $scope.tampil = false;
  // $scope.listPemasukan = function (){      
  //   //Fungsi Select Pemasukan
  //       var query = "SELECT pemasukan.*,kategori.warna,kategori.nama FROM pemasukan left join kategori on pemasukan.kategori=kategori.id order by pemasukan.id desc";
  //       var data =  $cordovaSQLite.execute(db, query).then(function(res) {
  //           if(res.rows.length > 0) {
  //               //console.log("SELECTED -> " + res.rows.item(0).nama_pemasukan + " " + res.rows.item(0).jumlah);                
  //               for(i=0;i<res.rows.length;i++){                    
  //                   var nama = res.rows.item(i).nama;                                                                            
  //                   data[i] = {
  //                               'id' : res.rows.item(i).id, 
  //                               'jumlah' : res.rows.item(i).jumlah,
  //                               'tabung' : res.rows.item(i).tabung,
  //                               'tanggal' : res.rows.item(i).tanggal,
  //                               'toggle' : res.rows.item(i).toggle,
  //                               'kategori' : res.rows.item(i).kategori,
  //                               'nama' : nama.substring(0,1).toUpperCase(),                                  
  //                               'namaKategori' : nama,                                  
  //                               'warna' : res.rows.item(i).warna,
  //                           };
  //               }                
  //               $scope.pemasukans = data;  
  //               console.log(data);              
  //           }
  //           else {
  //               console.log("No results found");
  //           }
  //       }, function (err) {
  //           console.error(err);
  //       });
  //   };
    // $scope.listPemasukan();

  
   
  
  $scope.pemasukanData = {
       labels: labels,
       data: datas
   };
  //donat grafik
  // $scope.labelsA = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.dataA = [65, 59, 80, 81, 56, 55, 40];

})
.controller('donatCtrl',function($scope,$ionicModal, $ionicPopup,$cordovaSQLite, $stateParams){
       var labelsa = [];
       var datasa = [];
       var colora = [];
       // var totala = [];
       var total = 0;       
       var query = "SELECT pemasukan.*,sum(pemasukan.jumlah) as total, kategori.nama, kategori.warna FROM pemasukan left join kategori on pemasukan.kategori=kategori.id group by kategori.id";
       //var query = "SELECT kategori, jumlah FROM pemasukan";
       var data =  $cordovaSQLite.execute(db, query).then(function(res) {
           if(res.rows.length > 0) {                
               for(i=0;i<res.rows.length;i++){                    
                   labelsa[i] = res.rows.item(i).nama;
                   datasa[i] = res.rows.item(i).total;
                   colora[i] = res.rows.item(i).warna;
                   total += (res.rows.item(i)).total;

               }                
               console.log("my labels = "+labelsa);
               console.log("my datas "+datasa);
           } else {
               console.log("No results found");
           }
       }, function (err) {
           console.error(err);
       });

   db.transaction(function(tx) {
   tx.executeSql('sum(pemasukan.jumlah) as total FROM pemasukan', 
                 [],
                 function(tx, results)
                 {
                   return(result[0].total); 
                 },
                 function(tx, error)
                 {

                 }
   );
});
   //console.log((result[0].total));

             
   //$scope.pemasukanData = {
       $scope.labelsa = labelsa;
       $scope.datasa = datasa;
       $scope.colora = colora;
       $scope.totala = total;
       
   //};  

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