// 代码生成时间: 2025-10-19 21:16:33
angular.module('ClinicalTrialApp', ['ionic'])

.controller('TrialCtrl', function($scope) {

  // 临床试验数据初始化
  $scope.trials = [];
  
  // 模拟的API服务
  $scope.api = {
    getTrials: function() {
      return [
        { id: 1, name: 'Trial A' },
        { id: 2, name: 'Trial B' },
        { id: 3, name: 'Trial C' }
      ];
    },
    addTrial: function(trial) {
      // 这里应该添加实际的API调用代码
      console.log('Added new trial:', trial);
      $scope.trials.push(trial);
    },
    updateTrial: function(updatedTrial) {
      // 这里应该添加实际的API调用代码
      console.log('Updated trial:', updatedTrial);
      // 查找并更新试验
      for (var i = 0; i < $scope.trials.length; i++) {
        if ($scope.trials[i].id === updatedTrial.id) {
          $scope.trials[i] = updatedTrial;
          break;
        }
      }
    },
    deleteTrial: function(trialId) {
      // 这里应该添加实际的API调用代码
      console.log('Deleted trial with ID:', trialId);
      // 删除试验
      $scope.trials = $scope.trials.filter(function(trial) {
        return trial.id !== trialId;
      });
    }
  };

  // 获取临床试验列表
  $scope.loadTrials = function() {
    $scope.trials = $scope.api.getTrials();
  };

  // 添加新试验
  $scope.addNewTrial = function() {
    var newTrial = { id: $scope.trials.length + 1, name: 'New Trial' };
    $scope.api.addTrial(newTrial);
  };

  // 更新试验
  $scope.editTrial = function(trial) {
    var updatedTrial = angular.copy(trial);
    // TODO: 提示用户编辑试验信息
    // 这里只是一个示例，实际应用中需要弹窗或其他UI组件来收集用户输入
    $scope.api.updateTrial(updatedTrial);
  };

  // 删除试验
  $scope.deleteTrial = function(trialId) {
    if (confirm('Are you sure you want to delete this trial?')) {
      $scope.api.deleteTrial(trialId);
    }
  };

  // 在控制器初始化时加载试验列表
  $scope.loadTrials();

});

// 用于展示试验列表的模板
angular.module('ClinicalTrialApp').run(function($templateCache) {
  $templateCache.put('trial-list.html', '<section ng-controller="TrialCtrl">
  <ion-list>
    <ion-item ng-repeat="trial in trials" class="item item-thumbnail-left" ng-click="editTrial(trial)">
      <img src="http://www.gravatar.com/avatar/动植物{{trial.id}}.jpg?s=100&d=mm" />
      <h2>{{trial.name}}</h2>
      <button class="button button-positive" ng-click="deleteTrial(trial.id)">Delete</button>
    </ion-item>
  </ion-list>
  <ion-footer-bar align-title="center" class="bar-stable">
    <h1>
      <button class="button button-block button-positive" ng-click="addNewTrial()">Add New Trial</button>
    </h1>
  </ion-footer-bar>
</section>');
});