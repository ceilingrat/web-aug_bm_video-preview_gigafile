({ 
    aElementConfig : [
        {  
            node : "dialog",
            attr : {
                id : "dlgPreviewPlayer",
                style : "width: 60%; height: 60%;"
            },
            children : [
                {
                    node: "video",
                    attr : {
                        style : "width: 90%; height: 90%;",
                        controls : ""
                    }
                },
                {
                    node: "button",
                    attr : {
                        onclick : "this.parentElement.querySelector(\"video\").pause(); this.parentElement.close();" 
                    },
                    text : "close dialog"
                }
            ]
        }
    ],

    fnInsertElements : function ( aElem ) {
        var oDocFrag = document.createDocumentFragment(),
            oL0, oL1, x, y, z;
        for ( x of aElem ) {
            oL0 = document.createElement( x.node );
            if ( "attr" in x ) for ( y in x.attr ) {
                oL0.setAttribute( y, x.attr[y] );
            };
            for ( y of x.children ) {
                oL1 = document.createElement( y.node );
                if ( "attr" in y ) for ( z in y.attr ) {
                    oL1.setAttribute( z, y.attr[z] );
                };
                if ( "text" in y ) { 
                    oL1.append( y.text );
                };
                oL0.append( oL1 );
            };
            oDocFrag.append( oL0 );
        };
        document.body.insertBefore( oDocFrag, document.body.firstElementChild );
    },

    fnUpdateVideoSrc : function  () {
        var bSuccess = false, 
            sPrompt = prompt("paste link here");
        if ( bSuccess = Boolean( sPrompt ) ) document.querySelector("#dlgPreviewPlayer video").src = sPrompt;
        return bSuccess;
    },

    fnShowModal : function  () {
        var oDlg = document.querySelector("#dlgPreviewPlayer");
        try {
            oDlg.showModal();
            console.log( "dialog opened" );
        }
        catch (e) {
            console.log( "dialog already open" );
        };
    },

    main : function () {
        var aElem = this.aElementConfig;
        if ( !document.getElementById( aElem[0].attr.id ) ) {
            this.fnInsertElements( aElem );
        };
        if( this.fnUpdateVideoSrc() ) this.fnShowModal();
    }

}).main();
