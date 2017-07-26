
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