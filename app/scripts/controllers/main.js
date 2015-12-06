'use strict';

/*
=== Globals ===
*/
    //Username
    var g_username = 'user';

    //Data - Assume this was retrieved
    var notes = [
        {
            user: 1234,
            firstname: 'Henry',
            surname: 'Jones',
            title: 'A note from Henry',
            date: '2015-12-05 15:28:00',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
        },
        {
            user: 5678,
            firstname: 'Sarah',
            surname: 'Smith',
            title: 'Note by Sarah',
            date: '2015-08-01 09:32:00',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?'
        }
    ];


/*
=== Controller: Login ===
*/
    yopaApp.controller('LoginCtrl', function ($scope) {

        $scope.warning = false;

        $scope.login = function(username, password) {
            if (username && password) {
                g_username = username;
                window.location.href = '#/overview/';
            } else {
                $scope.warning = true;
            }
        }

    });

/*
=== Controller: Main ===
*/
    yopaApp.controller('MainCtrl', function ($scope, noteFactory) {

        $scope.username = g_username;
        $scope.notes = notes;
        $scope.warning = false;

        $scope.addNote = function (noteText) {

            if (!noteText) {
                $scope.warning = true;
                return;
            }

            noteFactory.add(noteText);
            $scope.noteText = '';
        }

        $scope.removeNote = function (noteId) {
            noteFactory.remove(noteId);
        }

    });


/*
=== Factory: Add/Remove notes ===
*/
    yopaApp.factory('noteFactory', function () {
        return {
            add: function(noteText) {
                //Use unshift so new note appears first
                notes.unshift(
                    {
                        user: 9012,
                        firstname: g_username,
                        surname: 'Doe',
                        title: 'Another note',
                        date: new Date(),
                        content: noteText
                    }
                );
            },
            remove: function(noteId) {
                //For this pretend app, just remove it from the array
                notes.splice(noteId, 1);
            }
        }
    });


/*
 === Filter: Pretty Date ===
*/
    yopaApp.filter('prettyDate', function ($filter) {
        return function (date) {

            //Angular's Date Filter
            var angularDateFilter = $filter('date');
            //Format Date
            date = new Date(date);
            //Todays Date
            var d = new Date();
            //Set time to be midnight so Today/Yesterday string works
            d.setHours(23,59,59,0);
            //Date Difference
            var dd = Math.floor((d - date) / (1000*60*60*24));

            switch (dd) {
                case 0:
                    return 'Today @ ' + angularDateFilter(date, 'HH:mm');
                case 1:
                    return 'Yesterday @ ' + angularDateFilter(date, 'HH:mm');
            }
            return angularDateFilter(date, 'dd/MM/yy @ HH:mm');

        };
    });
