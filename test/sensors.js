/*jshint undef:false */

describe('sensors', function () {
	var sensors = {};

	beforeEach(function () {
		sensors = {
			sensor: [{
				id: '2813567',
				name: 'firstfloor',
				lastUpdated: 1423582025,
				ignored: 0,
				client: '58229',
				clientName: 'Hemma',
				online: '1',
				editable: 1,
				battery: 254
			}, {
				id: '2814769',
				name: 'freezer',
				lastUpdated: 1423582285,
				ignored: 0,
				client: '58229',
				clientName: 'Hemma',
				online: '1',
				editable: 1,
				battery: 254
			}, {
				id: '2813556',
				name: 'fridge',
				lastUpdated: 1423582490,
				ignored: 0,
				client: '58229',
				clientName: 'Hemma',
				online: '1',
				editable: 1,
				battery: 254
			}]
		};
	});

	describe('#getSensors()', function () {
		describe('success', function () {
			it('returns an array of sensors - if everything works fine', function (done) {
				// Do something
				done();
			});
		});
		describe('failure', function () {
			it('forwards error message', function (done) {
				// Do something
				done();
			});
			it('handles empty error message', function (done) {
				// Do something
				done();
			});
		});
	});
});
