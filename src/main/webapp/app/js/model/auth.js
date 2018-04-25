/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function () {
    'use strict';

    var deps = ['lib/underscore', 'lib/backbone'];
    define(deps, function (_, Backbone) {
        var SessionModel = Backbone.Model.extend({
            urlRoot: window.ux.ROOT_URL + 'rest/token',
            defaults: {
                auth: false,
                username: '',
                access_token: '',
                token_type: ''
            },
            initialize: function () {
                var me = this;
                $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
                    var access_token = me.get('access_token'), token_type = me.get('token_type') + " ";
                    if(typeof access_token !== 'undefined' && !!access_token) {
                        jqXHR.setRequestHeader('Authorization', token_type + access_token);
                    }
                });
            },
            login: function(creds) {
                var me = this;
                return new Promise( function (res, rej) {
                    me.save(creds, {
                        success: function (model, resp) {
                            if (!resp || !resp['access_token']) rej(model, resp);

                            me.set({
                                auth: true,
                                username: creds['username'],
                                access_token: resp['access_token'],
                                token_type: resp['token_type']
                            });
                            res(me.get('auth'));
                        },
                        error: rej
                    });
                });
            },
            logout: function() {
                var me = this;
                return new Promise( function (res, rej) {
                    me.clear();
                    me.destroy({
                        success: function (model, resp) {
                            me.id = null;
                            me.set({
                                auth: false,
                                username: '',
                                access_token: '',
                                token_type: ''
                            });
                            res(!me.get('auth'));
                        },
                        error: rej
                    });
                });
            },
            getAuth: function() {
                var me = this;
                return new Promise(function(res, rej) {
                    /*this.fetch({
                        success: function(model, resp) {
                            res(me.get('auth'));
                        },
                        error: function() {
                            me.logout();
                            rej();
                        }
                    });*/
                    // TODO: finish AUTH from token;
                    res();
                })
            }
        });
        return new SessionModel();

    });
}());