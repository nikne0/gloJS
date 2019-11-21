/*
 *** Created by NikNet 20.11.2019
*/
"use strict";

const valid = new Validator({
    selector: '#myform',
    pattern: {
        // phone:
    },
    method: {
        'phone': [
            ['notEmpty'],
            ['pattern', 'phone'],
        ],
        'email': [
            ['notEmpty'],
            ['pattern', 'email']
        ]
    }
});

valid.init();
