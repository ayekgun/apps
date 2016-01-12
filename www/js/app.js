// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
<<<<<<< HEAD
var db;

angular.module('starter', ['ionic', 'starter.controllers','ionic-color-picker','ngCordova','pemasukan.controllers','pengeluaran.controllers'])

.run(function($ionicPlatform, $cordovaSQLite) {
=======
angular.module('starter', ['ionic', 'starter.controllers','ionic-color-picker'])

.run(function($ionicPlatform) {
>>>>>>> 14a7c70af96a267fec5516765151e85b06c95eaf
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
<<<<<<< HEAD

    // if (window.StatusBar) {
    //   // org.apache.cordova.statusbar required
    //   StatusBar.styleDefault();
    // }
    // db = $cordovaSQLite.deleteDB("my.db"); 
    // window.sqlitePlugin.deleteDatabase({name: "my.db", location: 1}, successcb, errorcb); 

    if (window.cordova) {            
            db = $cordovaSQLite.openDB({ name: "my.database34" }); //device
        }
    else{
             db = window.openDatabase("my.database34", '1', 'my', 1024 * 1024 * 100); // browser
        }                
        
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pemasukan (id integer primary key, jumlah int, tabung int, tanggal DATE, toggle BOOLEAN, kategori int)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pengeluaran (id integer primary key, nama text, jumlah int, tanggal DATE, kategori int)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS kategori(id integer primary key, nama text, warna text )");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS kategoripengeluaran(id integer primary key, nama text, warna text )");
=======
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
>>>>>>> 14a7c70af96a267fec5516765151e85b06c95eaf
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })  
  .state('app.kategori-pemasukan', {
      url: '/kategori-pemasukan',
      views: {
        'menuContent': {
          templateUrl: 'templates/pemasukan/kategori-pemasukan.html',
          controller: 'pemasukanCtrl'
        }
      }
    })
  .state('app.kategori-pengeluaran', {
      url: '/kategori-pengeluaran',
      views: {
        'menuContent': {
          templateUrl: 'templates/pengeluaran/kategori-pengeluaran.html',
          controller: 'pengeluaranCtrl'
        }
      }
    })

  .state('app.pemasukan', {
      url: '/pemasukan',
      views: {
        'menuContent': {
          templateUrl: 'templates/pemasukan/pemasukans.html',
          controller: 'pemasukanCtrl'          
        }
      }
    })

  .state('app.pengeluaran', {
      url: '/pengeluaran',
      views: {
        'menuContent': {
          templateUrl: 'templates/pengeluaran/pengeluarans.html',
          controller: 'pengeluaranCtrl'          
        }
      }
    })  
    
    
    .state('app.grafik', {
      clicked : false ,
      url: '/grafik',
      views: {
        'menuContent': {
          templateUrl: 'templates/grafik/grafik.html', 
          controller : 'grafikCtrl'                  
=======
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
    
    .state('app.grafik', {
      url: '/grafik',
      views: {
        'menuContent': {
          templateUrl: 'templates/grafik.html', 
          controller : 'ExampleController'         
>>>>>>> 14a7c70af96a267fec5516765151e85b06c95eaf
        }
      }
    })

<<<<<<< HEAD
    .state('app.forecast', {
      url: '/forecast',
      views: {
        'menuContent': {
          templateUrl: 'templates/grafik/forecast.html', 
          controller : 'forecastCtrl'         
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller : 'tambahCtrl'         
        }
      }
    })
  .state('app.detilbulan', {
      url: '/detilbulan',
      views: {
        'menuContent': {
          templateUrl: 'templates/grafik/detailgrafikpemasukan.html',
          controller : 'grafikCtrl'         
        }
      }
    })  

=======
>>>>>>> 14a7c70af96a267fec5516765151e85b06c95eaf
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
<<<<<<< HEAD
  $urlRouterProvider.otherwise('/app/home');
=======
  $urlRouterProvider.otherwise('/app/playlists');
>>>>>>> 14a7c70af96a267fec5516765151e85b06c95eaf
});