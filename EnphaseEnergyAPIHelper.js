function EnphaseEnergyAPIHelper() {
}

EnphaseEnergyAPIHelper.prototype = {
    updateSpreadsheet: function () {
        let sheet = SpreadsheetApp.openById(EnphaseEnergySpreadsheetId).getActiveSheet();
        let rows = this.getLifeTimeEnergy();
        sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);    
      
        return {
          status: 'Success',
          numberOfDays: rows.length - 1
        };
    },

    // Get the lifetime energy of the system
    getLifeTimeEnergy: function () {
        let systemId = this.getSystemId();
        let response = this.getLifetimeEnergyResponse(systemId);
        let date = new Date(response.start_date);
        let production = response.production;

        // create the header row
        let rows = [];
        let headerRow = ['date', 'energy_produced'];
        rows.push(headerRow);

        // add row for each day
        for (let output of production) {
            let row = [date.toUTCString(), output];
            rows.push(row);
            date.setDate(date.getDate() + 1);
        }

        return rows;
    },

    // Get the system ID.  This assumes only one system.
    getSystemId: function () {
        let response = this.getSystemsResponse();
        var firstSystem = response.systems[0];
        return firstSystem.system_id;
    },

    getLifetimeEnergyResponse: function (systemId) {
        let url = `https://api.enphaseenergy.com/api/v2/systems/${systemId}/energy_lifetime?key=${EnphaseEnergyAPIKey}&user_id=${EnphaseEnergyAPIUserId}`;
        let response = UrlFetchApp.fetch(url);
        return JSON.parse(response.getContentText());
    },

    getSystemsResponse: function () {
        let url = `https://api.enphaseenergy.com/api/v2/systems?key=${EnphaseEnergyAPIKey}&user_id=${EnphaseEnergyAPIUserId}`;
        let response = UrlFetchApp.fetch(url);
        return JSON.parse(response.getContentText());
    }
};