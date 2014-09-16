var JIDMixin = require('ampersand-jid-datatype-mixin');
var State = require('ampersand-state');
var Collection = require('ampersand-collection');
var Message = require('otalk-model-message');
var DiscoInfo = require('otalk-model-disco');


module.exports = State.extend({dataTypes: JIDMixin.dataTypes}, {
    props: {
        jid: 'jid',
        isSelf: 'boolean',
        show: {
            type: 'string',
            values: [
                'dnd',
                'xa',
                'away',
                'chat',
                ''
            ]
        },
        status: 'string',
        priority: ['number', true, 0],
        avatarID: 'string',
        online: 'boolean',
        errorCondition: 'string',
        errorMessage: 'string',
        idleSince: 'date',
        requestingAttention: 'boolean',
        chatState: {
            type: 'string',
            values: [
                'composing',
                'paused',
                'active',
                'inactive',
                'gone',
                ''
            ]
        },
        lastSentMessageID: 'string'
    },

    generateId: function (attrs) {
        return attrs.jid.full || attrs.jid;
    },

    derived: {
        id: {
            deps: ['jid'],
            fn: function () {
                return this.jid.full;
            }
        },
        offline: {
            deps: ['online'],
            fn: function () {
                return !this.online;
            }
        }
    },

    children: {
        caps: DiscoInfo
    },

    collections: {
        discoItems: Collection.extend({
            model: DiscoInfo
        }),
        messages: Collection.extend({
            model: Message,
            comparator: 'comparator'
        })
    }
});
