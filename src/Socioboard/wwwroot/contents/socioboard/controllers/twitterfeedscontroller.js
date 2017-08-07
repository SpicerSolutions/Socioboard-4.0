'use strict';

SocioboardApp.controller('TwitterFeedsController', function ($rootScope, $scope, $http, $modal, $timeout, $stateParams, apiDomain, domain, grouptask) {
    //alert('helo');
    $scope.$on('$viewContentLoaded', function () {
        $scope.disbtncom = true;
        $scope.buildbtn = true;
        // initialize core components
        var preloadmorefeeds = false;
        var preloadmoretweets = false;
        var endtwfeeds = false;
        var endtwtweets = false;
        $scope.filterrTxtt = 'All Posts';
        $scope.SorttTxtt = 'Popular';
        twitterfeeds();
        var start = 0; // where to start data
        var ending = start + 10; // how much data need to add on each function call
        var reachLast = false; // to check the page ends last or not
        var TweetsreachLast = false; // to check the user tweets ends last or not

                //select all
        var getAllSelected = function () {
            var selectedItems = $rootScope.lstProfiles.filter(function (profile) {
                return profile.Selected;
            });

            return selectedItems.length === $rootScope.lstProfiles.length;
        }

        var setAllSelected = function (value) {
            angular.forEach($rootScope.lstProfiles, function (profile) {
                profile.Selected = value;
            });
        }

        $scope.allSelected = function (value) {
            if (value !== undefined) {
                return setAllSelected(value);
            } else {
                return getAllSelected();
            }
        }
        //end

        $scope.loadmore_twt = "click here to load more";
        $scope.loadmore_feed = "click here to load more";
        $scope.lstTwtFeeds = [];
        $scope.lstUserTweets = [];
        $scope.LoadTopFeeds = function () {
            $scope.filters = false;
            $scope.preloadmorefeeds = false;
            $scope.lstTwtFeeds = null;
            $scope.filterrTxtt = 'All Posts';
            $scope.SorttTxtt = 'Popular';
            //codes to load  recent Feeds
            $http.get(apiDomain + '/api/Twitter/GetFeeds?profileId=' + $stateParams.profileId + '&userId=' + $rootScope.user.Id + '&skip=0&count=10')
                          .then(function (response) {
                              // $scope.lstProfiles = response.data;
                              $scope.lstTwtFeeds = response.data;
                              $scope.preloadmorefeeds = true;
                              if (response.data == null) {
                                  reachLast = true;
                              }
                              $scope.dropCalled = true;
                              setTimeout(function () { 
                                  $scope.callDropmenu();
                              }, 1000);
                          }, function (reason) {
                              $scope.error = reason.data;
                          });
            // end codes to load  recent Feeds
        }


          $scope.LoadTopTweets = function () {
              //codes to load  recent Tweets
            
              $http.get(apiDomain + '/api/Twitter/GetUserTweets?profileId=' + $stateParams.profileId + '&userId=' + $rootScope.user.Id + '&skip=0&count=10')
                          .then(function (response) {
                              $scope.lstUserTweets = response.data;
                              $scope.preloadmoretweets = true;
                              if (response.data == null) {
                                  TweetsreachLast = true;
                              }
                          }, function (reason) {
                              $scope.error = reason.data;
                          });
              // end codes to load  recent Tweets
        }
          $scope.LoadTopFeeds();
          $scope.LoadTopTweets();
        // Code for Loading button twts ..
        $scope.listData = function () {

              if (TweetsreachLast) {
                  return false;
              }
              $http.get(apiDomain + '/api/Twitter/GetUserTweets?profileId=' + $stateParams.profileId + '&userId=' + $rootScope.user.Id + '&skip=' + ending + '&count=10')
                           .then(function (response) {
                             

                               if (response.data == null || response.data == "") {
                                   TweetsreachLast = true;
                                   $scope.loadmore_twt = "Reached at bottom";
                                   $scope.endtwtweets = true;
                                   $scope.loaderclasstwt = 'hide';
                               }
                               else {
                                   $scope.lstUserTweets = $scope.lstUserTweets.concat(response.data);
                                   ending = ending + 10;
                                   $scope.listData();
                               }
                           }, function (reason) {
                               $scope.error = reason.data;
                           });
        };
        // Code for Loading button feeds ..
        $scope.listData1 = function () {

              if (reachLast) {
                  return false;
              }
              $http.get(apiDomain + '/api/Twitter/GetFeeds?profileId=' + $stateParams.profileId + '&userId=' + $rootScope.user.Id + '&skip=' + ending + '&count=10')
                           .then(function (response) {
                            

                               if (response.data == null || response.data == "") {
                                   reachLast = true;
                                   $scope.loadmore_feed = "Reached at bottom";
                                   $scope.endtwfeeds = true;
                                   $scope.loaderclassfeed = 'hide';
                               }
                               else {
                                   $scope.lstTwtFeeds = $scope.lstTwtFeeds.concat(response.data);
                                   ending = ending + 10;
                                   $scope.listData1();
                               }
                           }, function (reason) {
                               $scope.error = reason.data;
                           });
        };



        $scope.ReconnectTwt = function (xyz) {

           
            $http.get(domain + '/socioboard/Reconntwtacc?code=' + true)
                              .then(function (response) {
                                  window.location.href = response.data;

                              }, function (reason) {
                                  $scope.error = reason.data;
                              });

        };

        $scope.filterSearch = function (mediaType, txtt) {
            $scope.filters = true;
            $scope.preloadmorefeeds = false;
            $scope.lstTwtFeeds = null;
            $scope.filterrTxtt = txtt;
            //codes to load  recent Feeds
            $http.get(apiDomain + '/api/Twitter/GetTwFilterFeeds?profileId=' + $stateParams.profileId + '&userId=' + $rootScope.user.Id + '&skip=0&count=10' + '&mediaType=' + mediaType)
                          .then(function (response) {
                              // $scope.lstProfiles = response.data;
                              //$scope.lstinsFeeds = response.data;
                              if (response.data == null) {
                                  reachLast = true;
                              }
                              $scope.lstTwtFeeds = response.data;
                              $scope.preloadmorefeeds = true;


                          }, function (reason) {
                              $scope.error = reason.data;
                          });
            // end codes to load  recent Feeds
        }

          $scope.twitterretweet = function (screenName, profileId, messageId) {
              swal({
                  title: "Are you sure?",
                  text: "Retweet this message by " + screenName,
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "Yes, Retweet it!",
                  closeOnConfirm: false
              },
           function () {
               //code for Retweet Post
               $http.post(apiDomain + '/api/Twitter/TwitterRetweet_post?groupId=' + $rootScope.groupId + '&userId=' + $rootScope.user.Id + '&profileId=' + profileId + '&messageId='+messageId)
                           .then(function (response) {
                               response.data;
                               swal(response.data);
                           }, function (reason) {
                               $scope.error = reason.data;
                           });
               // end codes Retweet Post
              
           });
          }

          $scope.twitterfavorite=function(screenName, profileId, messageId)
          {
                  swal({
                      title: "Are you sure?",
                      text: "Favorite this message by " + screenName,
                      type: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: "Yes, Favourite it!",
                      closeOnConfirm: false
                  },
               function () {
                   //code for favorite Post
                   $http.post(apiDomain + '/api/Twitter/TwitterFavorite_post?groupId=' + $rootScope.groupId + '&userId=' + $rootScope.user.Id + '&profileId=' + profileId + '&messageId='+messageId)
                               .then(function (response) {
                                   response.data;
                                   swal(response.data);
                               }, function (reason) {
                                   $scope.error = reason.data;
                               });
                   // end codes favorite Post
              
               });
          }

          $scope.twitterreply = function (screenName,profileId, messageId) {
              $rootScope.profileId = profileId;
              $rootScope.messageId = messageId;
              $rootScope.screenName = screenName;
              //$scope.modalinstance = $modal.open({
              //    templateUrl: 'twitterModalContent.html',
              //    controller: 'twittermodalcontroller',
              //    scope: $scope
              //});
              $('#Tiwtter_Modal').openModal();
          }


        $scope.saveCommentReply = function () {
             
              var message = $('#comment_text').val();
              if (/\S/.test(message)) {
                  swal({
                      title: "Are you sure?",
                      text: "Reply this message to " + $rootScope.screenName,
                      type: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: "Yes, Reply it!",
                      closeOnConfirm: false
                  },
                        function () {
                            // $scope.modalinstance.dismiss('cancel');
                            //code for favorite Post
                            $http.post(apiDomain + '/api/Twitter/TwitterReplyUpdate?groupId=' + $rootScope.groupId + '&userId=' + $rootScope.user.Id + '&profileId=' + $rootScope.profileId + '&messageId=' + $rootScope.messageId + '&message=' + message + '&screenName=' + $rootScope.screenName)
                                        .then(function (response) {
                                            $('#comment_text').val('');
                                            response.data;
                                            swal(response.data);
                                        }, function (reason) {
                                            $scope.error = reason.data;
                                        });
                            // end codes favorite Post

                        });
              }
              else
              {
                  swal("Enter some text for reply");
              }
          }

          $rootScope.taskNotification = {};
          $rootScope.tasktweetNotification = {};
          $scope.tasktwtfeedModel = function (notification) {
              $rootScope.taskNotification = notification;
              $('#TasktwtfeedModal').openModal();
              Materialize.updateTextFields();
          }
          $scope.tasktwttweetModel = function (twtnotification) {
              $rootScope.tasktweetNotification = twtnotification;
              $('#TasktwttweetModal').openModal();

          }

          $scope.addtwtfeedTask = function (feedTableType) {

              var memberId = $('.task-user-member:checked');
              var taskComment = $('#tasktwtfeedComment').val();
              if (!memberId.val()) {
                  swal('Please select a member to assign the task');
              }
              else if (!(/\S/.test(taskComment))) {
                  swal('Please write a comment to assign the task');
              }
              else {
                  var assignUserId = memberId.val();
                  grouptask.addtasks(assignUserId, feedTableType, taskComment, $rootScope.taskNotification.feed, $rootScope.taskNotification.messageId, $rootScope.taskNotification.mediaUrl);

              }
          }

          $scope.addtwttweetTask = function (feedTableType) {

              var memberId = $('.task-user-member:checked');
              var taskComment = $('#tasktwttweetComment').val();
              if (!memberId.val()) {
                  swal('Please select a member to assign the task')
              }
              else if (!(/\S/.test(taskComment))) {
                  swal('Please write a comment to assign the task')
              }
              else {
                  var assignUserId = memberId.val();
                  grouptask.addtasks(assignUserId, feedTableType, taskComment, $rootScope.tasktweetNotification.twitterMsg, $rootScope.tasktweetNotification.messageId, '');

              }
          }


        //repost

          $scope.openComposeMessage = function (contentFeed) {
             
              jQuery('input:checkbox').removeAttr('checked');
              if (contentFeed != null) {
                  var message = {
                      "title": contentFeed.feed,
                      "image": contentFeed.mediaUrl,
                  };

                  $rootScope.contentMessage = message;

              }

              $('#ComposePostModal').openModal();
              var composeImagedropify = $('#composeImage').parents('.dropify-wrapper');
              $(composeImagedropify).find('.dropify-render').html('<img src="' + contentFeed.mediaUrl + '">');
              $(composeImagedropify).find('.dropify-preview').attr('style', 'display: block;');
              $('select').material_select();
          }
        //end

          $scope.callDropmenu = function () {
              $('.dropdown-button').dropdown({
                  inDuration: 300,
                  outDuration: 225,
                  constrain_width: false, // Does not change width of dropdown to that of the activator
                  hover: true, // Activate on hover
                  gutter: 0, // Spacing from edge
                  belowOrigin: false, // Displays dropdown below the button
                  alignment: 'right' // Displays dropdown with edge aligned to the left of button
              });
          }

        // start compose
          $scope.ComposeMessage = function () {
            
              $scope.disbtncom = false;
              var profiles = new Array();
              $("#checkboxdata .subcheckbox").each(function () {

                  var attrId = $(this).attr("id");
                  if (document.getElementById(attrId).checked == false) {
                      var index = profiles.indexOf(attrId);
                      if (index > -1) {
                          profiles.splice(index, 1);
                      }
                  } else {
                      profiles.push(attrId);
                  }
              });

              // var profiles = $('#composeProfiles').val();
              var message = $('#composeMessage').val();
              //if (image == "N/A") {
              //    image = image.replace("N/A", "");
              //}
              var updatedmessage = "";
              message = encodeURIComponent(message);
              //var postdata = message.split("\n");
              //for (var i = 0; i < postdata.length; i++) {
              //    updatedmessage = updatedmessage + "<br>" + postdata[i];
              //}
              //updatedmessage = updatedmessage.replace(/#+/g, 'hhh');
              if (profiles.length > 0 && message != '') {
                  $scope.checkfile();
                  if ($scope.check == true) {
                      var formData = new FormData();
                      formData.append('files', $("#composeImage").get(0).files[0]);
                      $http({
                          method: 'POST',
                          url: apiDomain + '/api/SocialMessages/ComposeMessage?profileId=' + profiles + '&userId=' + $rootScope.user.Id + '&message=' + message + '&imagePath=' + encodeURIComponent($('#imageUrl').val()),
                          data: formData,
                          headers: {
                              'Content-Type': undefined
                          },
                          transformRequest: angular.identity,
                      }).then(function (response) {
                          if (response.data == "Posted") {
                              $scope.disbtncom = true;
                              // $('#composeMessage').val('');
                              //$('#composeMessage').val('');
                              $('#ComposePostModal').closeModal();

                              swal('Message composed successfully');
                          }

                      }, function (reason) {

                      });
                  }
                  else {
                      alertify.set({ delay: 3000 });
                      alertify.error("File extension is not valid. Please upload an image file");
                      $('#input-file-now').val('');
                  }
              }
              else {
                  $scope.disbtncom = true;
                  if (profiles.length == 0) {
                      swal('Please select a profile');
                  }
                  else {
                      swal('Please enter some text to compose this message');
                  }
              }
          }

          $scope.checkfile = function () {
              var filesinput = $('#composeImage');

              var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
              if (filesinput != undefined && filesinput[0].files[0] != null) {
                  if ($scope.hasExtension('#composeImage', fileExtension)) {
                      $scope.check = true;
                  }
                  else {

                      $scope.check = false;
                  }
              }
              else {
                  $scope.check = true;
              }
          }
          $scope.hasExtension = function (inputID, exts) {
              var fileName = $('#composeImage').val();
              return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
          }
        //end

        // max least count
          $scope.ShortSearch = function (shortvalue, txtt) {
              $scope.filters = true;
              $scope.preloadmorefeeds = false;
              $scope.lstTwtFeeds = null;
              $scope.SorttTxtt = txtt;
              $http.get(apiDomain + '/api/Twitter/ShortTwtfeeds?profileId=' + $stateParams.profileId + '&userId=' + $rootScope.user.Id + '&skip=0&count=10' + '&shortvalue=' + shortvalue)
                            .then(function (response) {
                                if (response.data == null) {
                                    reachLast = true;
                                }
                                $scope.lstTwtFeeds = response.data;
                                $scope.preloadmorefeeds = true;


                            }, function (reason) {
                                $scope.error = reason.data;
                            });

          }

        //end

    });
});


SocioboardApp.controller('twittermodalcontroller', function ($rootScope, $scope, $http, apiDomain) {
    $scope.closeModal = function () {
        $scope.modalinstance.dismiss('cancel');
    }
});

// thousandSuffix to k  m 
SocioboardApp.filter('thousandSuffix', function () {
   
    return function (input, decimals) {
        var exp, rounded,
          suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

        if (window.isNaN(input)) {
            return null;
        }

        if (input < 1000) {
            return input;
        }

        exp = Math.floor(Math.log(input) / Math.log(1000));

        return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    };
});
