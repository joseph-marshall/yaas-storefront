/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2014 hybris AG
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with hybris.
 */

'use strict';

angular.module('ds.cart')
    .factory('CartSvc', ['$rootScope', function($rootScope){

        /*
            until the cart API has been implemented, we
            will just save items to the scope.
         */

        $rootScope.cart = [];

        return {
            getCart: function () {
                return $rootScope.cart;
            },
            pushProductToCart: function (product, productDetailQty) {
                for (var i = 0; i < productDetailQty; i++) {
                    $rootScope.cart.push(product);
                }
            },
            removeProductFromCart: function (name) {
                console.log('in Remove Product From Cart');
                angular.forEach($rootScope.cart, function (value, key) {
                   if(value.name === name) {
                       $rootScope.cart.splice(key, 1);
                       return false;
                   }
                });
            }
        };

    }]);
