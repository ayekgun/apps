angular.module('pemasukan.controllers', ['chart.js','ionic','ionic-color-picker'])  

.controller('pemasukanCtrl',function($scope,$http, $ionicModal, $timeout , $ionicPopup, $cordovaSQLite, $stateParams,$filter){

  $scope.pemasukanData = {tabung : 0};
  
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

        $scope.$on('$destroy', function() {       
          $scope.pemasukanModal.remove();
       });        
    };   

  $scope.doUpdatePemasukan = function(){
    var data = $scope.pemasukanData;    
    var dataDetil = [];
    var d = $filter('date')(new Date(data.tanggal), "yyyy-MM-dd");
    var query = "INSERT OR REPLACE INTO pemasukan (id, jumlah, toggle, tabung, tanggal, kategori)" + "VALUES (?,?,?,?,?,?)";    
    var data =  $cordovaSQLite.execute(db, query , [data.id, data.jumlah, data.toggle, data.tabung, d, data.kategori]).then(function(res) {
            if(res.rows.length > 0) {                
                for(i=0;i<res.rows.length;i++){
                    dataDetil = res.rows.item(i);          
                }                
                $scope.pemasukanData = dataDetil;                
            } else {
                console.log("No results found");
            }
            $scope.listPemasukan();
            // var query = "SELECT * FROM pemasukan order by id desc";
            //     var data =  $cordovaSQLite.execute(db, query).then(function(res) {
            //         if(res.rows.length > 0) {                
            //             for(i=0;i<res.rows.length;i++){
            //                 data[i] = res.rows.item(i);          
            //             }                
            //             $scope.pemasukans =data;                                                
            //         } else {
            //             console.log("No results found");
            //         }
            //     }, function (err) {
            //         console.error(err);
            //     });
                $scope.pemasukanModal.hide();            
        }, function (err) {
            console.error(err);
        });

  };
  
  $scope.doDeletePemasukan = function (){    
    var data = $scope.pemasukanData;    
    var dataDetil = [];
    var query = "DELETE FROM pemasukan where id =?";
    var data =  $cordovaSQLite.execute(db, query,[data.id]).then(function(res) {            
                $scope.listPemasukan();
                 $scope.pemasukanModal.hide();
        }, function (err) {
            console.error(err);
        });


  };
  
  $scope.listPemasukan = function (){      
    //Fungsi Select Pemasukan
        var query = "SELECT pemasukan.*,kategori.warna,kategori.nama FROM pemasukan left join kategori on pemasukan.kategori=kategori.id order by pemasukan.id desc";
        var data =  $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                //console.log("SELECTED -> " + res.rows.item(0).nama_pemasukan + " " + res.rows.item(0).jumlah);                
                for(i=0;i<res.rows.length;i++){                    
                    var nama = res.rows.item(i).nama;                                                                            
                    data[i] = {
                                'id' : res.rows.item(i).id, 
                                'jumlah' : res.rows.item(i).jumlah,
                                'tabung' : res.rows.item(i).tabung,
                                'tanggal' : res.rows.item(i).tanggal,
                                'toggle' : res.rows.item(i).toggle,
                                'kategori' : res.rows.item(i).kategori,
                                'nama' : nama.substring(0,1).toUpperCase(),                                  
                                'namaKategori' : nama,                                  
                                'warna' : res.rows.item(i).warna,
                            };
                }                
                $scope.pemasukans = data;  
                console.log(data);              
            }
            else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    };
    $scope.listPemasukan();

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

$scope.doSavePemasukan = function() {

            var data = $scope.pemasukanData;
            var d = $filter('date')(new Date(data.tanggal), "yyyy-MM-dd");
            var query = "INSERT INTO pemasukan (jumlah, toggle, tabung, tanggal, kategori) VALUES (?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [data.jumlah, data.toggle, data.tabung, d, data.kategori]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
                var alertPopup = $ionicPopup.alert({
                    title: 'Success',
                    template: 'data '+res.insertId+' berhasil disimpan'
                });
                $scope.getKategoriList(); 
                $scope.listPemasukan();               
                $scope.pemasukanModal.hide();    
            }, function (err) {
                console.error(err);
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'data gagal disimpan'
                });
                $scope.pemasukanModal.hide();
            });
    };

    $scope.kategoriData = {
                        'nama':'',
                        'warna' : 'aliceblue'
                    }; 

    $scope.saveKategori = function() {            
            var data = $scope.kategoriData;   
            console.log(data);                 
            var query = "INSERT INTO kategori (nama, warna) VALUES (?,?)";
            $cordovaSQLite.execute(db, query, [data.nama, data.warna]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
                var alertPopup = $ionicPopup.alert({
                    title: 'Success',
                    template: 'data '+res.insertId+' berhasil disimpan'
                });
                var dataDetil=[];
                var query = "SELECT * FROM kategori order by id desc";
                var data =  $cordovaSQLite.execute(db, query).then(function(res) {
                    if(res.rows.length > 0) {                
                        for(i=0;i<res.rows.length;i++){
                                var nama = res.rows.item(i).nama;                    
                                dataDetil[i] = {
                                        'value' : res.rows.item(i).id, 
                                        'text' : res.rows.item(i).nama,
                                        'warna' : res.rows.item(i).warna,
                                        'nama' : nama.substring(0,1).toUpperCase(),                                  
                                    };                            
                        }                                
                        $scope.kategoriList = dataDetil;                                                                    
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

    $scope.getKategoriList = function() {

        var dataDetil= [];        
        var query = "SELECT * FROM kategori ";
        var data =  $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {                
                for(i=0;i<res.rows.length;i++){  
                    var nama = res.rows.item(i).nama;                    
                    dataDetil[i] = {
                        'value' : res.rows.item(i).id, 
                        'text' : res.rows.item(i).nama,
                        'warna' : res.rows.item(i).warna,
                        'nama' : nama.substring(0,1).toUpperCase(),
                    };
                             
                }                                
                $scope.kategoriList = dataDetil;                              
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });            
    };
    
    $scope.getKategoriList();
    

  $scope.pengeluaranData = {
    kategori: 'makan'
  };
  
  $scope.$on('$destroy', function() {       
      $scope.pemasukanModal.remove();
   }); 
}) 
  
  
//*******************************************************************************************
  //* end proses PEMASUKAN


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
  });