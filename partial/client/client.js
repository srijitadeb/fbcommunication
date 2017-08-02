angular.module('fbCommunicationApp').controller('ClientCtrl',function($scope, $timeout, $interval){
    // $scope.posts = [1,2];
    $scope.isCollapsed = true;
   $scope.postsHardCoded = [{ text: 'hello World',timeStamp:(new Date()).getTime(), replyData:'', replies: [{ comment: 'Whats up..?', timeStamp:(new Date()).getTime() }, { comment: 'hi how r you?', timeStamp:(new Date()).getTime()}] }];
    $scope.saved = localStorage.getItem('posts');
    $scope.posts = [];
    $scope.posts.replies = [];
    if(!$scope.saved){
        $scope.posts = $scope.postsHardCoded;
        localStorage.setItem('posts', JSON.stringify($scope.postsHardCoded));
    }
    else {
        $scope.posts = angular.copy(JSON.parse($scope.saved));
    }

    function calculateTimeDiff(timeVal){
        var dateTimeNow = (new Date()).getTime();
            var timeStampDiff = Math.round((dateTimeNow - timeVal)/1000);
            var seconds = timeStampDiff % 60;
            var minutes = timeStampDiff > 60 ?  Math.round(timeStampDiff/60) % 60 : 0;
            var hours = minutes>60 ? Math.round(minutes/60) % 60 : 0;
            return (hours > 0 ? hours + ' hours ' : '') + (minutes > 0 ? minutes + ' mins ' : '' ) + (seconds + ' secs ago');
    }
        
    function resetTimeStamps(){
        $scope.posts = $scope.posts.map(function(post) {
            post.timeDiff = calculateTimeDiff(post.timeStamp);
            post.replies = post.replies.map(function(reply){
                 reply.timeDiff = calculateTimeDiff(reply.timeStamp);
                 return reply;
            });
            return post;
        });
    }
    resetTimeStamps();
    $interval(function(){ 
        resetTimeStamps();
    }, 2000);

    $scope.showLoader = false;
    $scope.postStatus= function(postData){
        $scope.showLoader = true;
        $timeout(function(){
            $scope.showLoader = false;
            $scope.posts.unshift({text:postData,replyData:'', timeStamp:(new Date()).getTime(),timeDiff:'0 secs ago', replies:[]});
            $scope.postData ='';
            localStorage.setItem('posts', JSON.stringify($scope.posts));
        }, 1000);
    }

    // replyFun is for reply of the main comment
    $scope.replyFun = function(keyEvent,index,reply){
        if(keyEvent.which === 13){
            $scope.posts[index].replies.push({comment: $scope.posts[index].replyData, timeStamp:(new Date()).getTime(), timeDiff:'0 secs ago'});
            $scope.posts[index].replyData = '';
           localStorage.setItem('posts', JSON.stringify($scope.posts));
        }
    }

});