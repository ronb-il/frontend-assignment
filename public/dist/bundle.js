angular.module('root', [
    'ngRoute',
    'dashboard'
])
function routeProvider($routeProvider){
    $routeProvider
      .when('/', {
          template: '<dashboard initial-data="$resolve.initialData"></dashboard>',
          resolve: {
            initialData: function($http){
              return $http({
                method: 'GET',
                url: '/api/dashboard'
              }).then(function successCallback(response) {
                return response.data;
              })
            }            
          }
      });
}

routeProvider.$inject = ['$routeProvider'];

angular.module('root')
  .config(routeProvider);

var dashboard = {
  template: `
  <main>
    <div class="content">
        <dashboard-webtype data="$ctrl.initialData.ClearWeb" name="ClearWeb">
        </dashboard-webtype>
        <dashboard-webtype data="$ctrl.initialData.DarkWeb" name="DarkWeb">
        </dashboard-webtype>
    </div>
  </main>
  `,
  controller: DashboardController,
  bindings: {
    initialData: '<',
    data: '<',
    options: '<'
  }
};

angular.module('root')
  .component('dashboard', dashboard);
angular.module('root')
.controller('DashboardController', DashboardController);

function DashboardController($log, $scope) {
  var ctrl = this;
};

DashboardController.$inject = ['$log', '$scope'];
angular.module('dashboard', []);
var dashboardWebtype = {
    template: `
        <section>
            <div class="section-type {{ classNameFromKey($ctrl.name) }}">
                <p class="heading">{{ labelFromKey($ctrl.name) }}</p>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    TYPES
                </div>
                <div class="panel-body types">
                    <div ng-repeat="(key, value) in $ctrl.data.Types" class="type-entry ng-class: ($index>3) ? 'last-entry' : '';">
                        <div class="details {{ classNameFromKey(key) }}">
                            <p>{{ value }}</p>
                            <p>{{ labelFromKey(key) }}</p>
                        </div>
                    </div>
                </div>
                <div class="panel-footer"></div>                
            </div>
            <div class="panel">
                <div class="panel-heading">
                    SEVERITIES
                </div>
                <div class="panel-body severities">
                    <div class="chart">
                        <svg width="190px" height="190px" viewBox="0 0 42 42" class="donut">
                            <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#214a6b"></circle>
                            <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#214a6b" stroke-width="2"></circle>
                            <!-- high -->
                            <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d54141" stroke-width="2" stroke-dasharray="{{ donutChartValues['High'].dashArray }}" stroke-dashoffset="{{ donutChartValues['High'].dashOffset }}"></circle>
                            <!-- medium -->
                            <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f3ab10" stroke-width="2" stroke-dasharray="{{ donutChartValues['Medium'].dashArray }}" stroke-dashoffset="{{ donutChartValues['Medium'].dashOffset }}"></circle> --> 
                            <!-- low -->
                            <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#41b0d5" stroke-width="2" stroke-dasharray="{{ donutChartValues['Low'].dashArray }}" stroke-dashoffset="{{ donutChartValues['Low'].dashOffset }}"></circle>
                        </svg>                        
                    </div>
                    <div><span class="label">HIGH</span><span class="value">{{ donutChartValues['High'].value }}</span></div>
                    <div><span class="label">MEDIUM</span><span class="value">{{ donutChartValues['Medium'].value }}</span></div>
                    <div><span class="label">LOW</span><span class="value">{{ donutChartValues['Low'].value }}</span></div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    SOURCES (%)
                </div>
                <div class="panel-body sources">
                    <div ng-repeat="(key, value) in $ctrl.data.Sources" class="source-entry clearfix">
                        <p class="label">{{ labelFromKey(key) }} </p>
                        <div id="progressbar">
                            <!-- obviously this doesn't account for values greater than 100 -->
                            <div style="width:{{ round(value) }}%"></div>
                        </div>
                        <p class="source-value">{{ round(value) }}</p>
                    </div>
                </div>                        
                <div class="panel-footer"></div>                 
            </div>         
        </section>
    `,
    controller: DashboardWebtypeController,
    bindings: {
        data: '<',
        name: '@name'
    }
}

angular.module('dashboard')
    .component('dashboardWebtype', dashboardWebtype);
function DashboardWebtypeController($log, $scope){
    var ctrl = this;

    $scope.labelFromKey = function(key) {
        return (key || '').split(/(?=[A-Z])/).join(' ');
    }

    $scope.classNameFromKey = function(key) {
        return (key || '').split(/(?=[A-Z])/).join('-').toLowerCase();
    }

    $scope.round = function(value) {
        return Math.round(value);
    }

    $scope.donutChartValues = (function(list) {
        var total = 0;
        var runningTotal = 0;
        var dashOffset = 0;
        var percent = 0;
        var value = 0;

        for(var key in list) {
        total = total + list[key];
        }

        // must be sorted as high, medium, low
        for(var key in list) {
        percent = (list[key] / total) * 100
        dashOffset = (key.toLowerCase() == 'high') ? 25 : 100 - runningTotal + 25;
        runningTotal += Math.round(percent);
        value = list[key]
        list[key] = {
            dashOffset: dashOffset,
            dashArray: Math.round(percent) + ' ' + (100 - Math.round(percent)),
            value: value
        }
        }

        return list;
    }(ctrl.data.Severities));
}

DashboardWebtypeController.$inject = ['$log', '$scope'];

angular.module('dashboard')
    .controller('DashboardWebtypeController', DashboardWebtypeController);
