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

    var deps = ['app/js/templates', 'lib/underscore', 'lib/backbone', 'app/js/tools/alert.view'];
    define(deps, function (templates, _, Backbone, AlertView) {
        var View = Backbone.View.extend({
            initialize: function(options){
                this.options = options || {};
            },
            tagName: 'div',
            className: 'ux-movie-page',
            events: {
                'submit .form-comment': function (evt) {
                    evt.preventDefault();
                    var me = this,
                        data = $(evt.target).serializeArray().reduce(function(obj, item) { obj[item.name] = item.value; return obj; }, {}),
                        router = window.BackboneApp.getRouter(),
                        id = me.model.get('id');
                    console.log(id);
                    if(!id) return ;
                    $.ajax({
                        method: "POST",
                        url: window.ux.ROOT_URL + 'rest/movies/' + id + '/comment',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success:function(data) {
                            console.log(data);
                        },
                        error: function(e) {
                            AlertView.show('Failed', 'Failed to comment (' + e.status + ')', 'danger');
                        }
                    });
                }
            },
            render: function () {
                var me = this;
                me.$el.empty();
                me.$el.append(templates.getValue('movie-page', {
                    title: me.model.get('title'),
                    director: me.model.get('director'),
                    genre: me.model.get('genre'),
                    rating: me.model.get('rating'),
                    year: me.model.get('year'),
                    comments: me.model.get('comments'),
                    id: me.model.get('id'),
                    currentYear: new Date().getFullYear()
                }));
                return me;
            }
        });
        return View;
    });
}());
