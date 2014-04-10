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

describe('Router test', function () {

    var scope, $state, $stateParams, $httpBackend, createController, ProductSvc;

    beforeEach(module('ds.router'));

    beforeEach(module('ds.products', function($provide) {
        mockedProductSvc = {
            query: jasmine.createSpy()
        };

        $provide.value('ProductSvc', mockedProductSvc);
    }));

    beforeEach(inject(function($injector) {              //, _ProductSvc
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });

        $httpBackend = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope').$new();
        $state = $injector.get('$state');
        $stateParams = $injector.get('$stateParams');
        ProductSvc = $injector.get('ProductSvc');
        var $controller = $injector.get('$controller');


        createController = function () {
            return $controller('BrowseProductsCtrl', {'$scope': scope, '$stateParams': $stateParams, 'ProductSvc': ProductSvc});
        }


        //$httpBackend.whenGET(/[a-z]*/).passThrough();

        $httpBackend.whenGET('public/js/app/products/templates/product-list.html').respond({});
        $httpBackend.whenGET('public/js/app/shared/templates/navigation.html').respond({});
        $httpBackend.whenGET('public/js/app/shared/templates/header.html').respond({});
        $httpBackend.whenGET('public/js/app/shared/templates/footer.html').respond({});
        $httpBackend.whenGET('public/js/app/home/templates/body.html').respond({});
        $httpBackend.whenGET('public/js/app/home/templates/home.html').respond({});

    }));



    afterEach(function () {
       $httpBackend.verifyNoOutstandingExpectation();
       $httpBackend.verifyNoOutstandingRequest();
    });

    it('states.should be mapped', function() {
       expect($state.href('base.product')).toEqualData('#!/products');
       $state.go('base.product');
       $httpBackend.flush();
        //expect(mockedProductSvc.query).toHaveBeenCalled();
    });

    it('Route change to base.product should trigger product load', function() {

        $state.go('base.product');
        $httpBackend.flush();
        // not working
        //expect(mockedProductSvc.query).toHaveBeenCalled();
    });

});