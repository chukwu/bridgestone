//undo redo
$.Redactor.prototype.bufferbuttons = function()
{
    return {
        init: function()
        {
            var undo = this.button.addFirst('undo', 'Undo');
            var redo = this.button.addAfter('undo', 'redo', 'Redo');
 
            this.button.addCallback(undo, this.buffer.undo);
            this.button.addCallback(redo, this.buffer.redo);
        }
    };
};

//underline
$.Redactor.prototype.underline = function()
{
    return {
        init: function()
        {
            var button = this.button.addAfter('italic', 'underline', 'Underline');
            this.button.addCallback(button, this.underline.format);
        },
        format: function()
        {
            this.inline.format('u');
        }
    };
};

//super,substring
$.Redactor.prototype.scriptbuttons = function()
{
    return {
        init: function()
        {
            var sup = this.button.add('superscript', 'Superscript');
            var sub = this.button.add('subscript', 'Subscript');
 
            // make your added buttons as Font Awesome's icon
            this.button.setAwesome('superscript', 'fa-superscript');
            this.button.setAwesome('subscript', 'fa-subscript');
 
            this.button.addCallback(sup, this.scriptbuttons.formatSup);
            this.button.addCallback(sub, this.scriptbuttons.formatSub);
        },
        formatSup: function()
        {
            this.inline.format('sup');
        },
        formatSub: function()
        {
            this.inline.format('sub');
        }
    };
};

/*
 * Uploadcare Redactor plugin (1.1.3)
 */

if (!RedactorPlugins) var RedactorPlugins = {};

(function($) {
    RedactorPlugins.uploadcare = function() {
        var $opts;
        return {
            init: function() {
                $opts = this.opts.uploadcare;
                // defaults
                if (! $opts.crop) {
                    $opts.crop = '';
                }
                if (! $opts.version) {
                    $opts.version = '2.5.0';
                }

                if (typeof uploadcare === 'undefined') {
                    var widget_url = 'https://ucarecdn.com/widget/' + $opts.version + '/uploadcare/uploadcare.min.js';
                    $.getScript(widget_url);
                }
                var button = this.button.addBefore('link','uploadcare', $opts.buttonLabel || 'Uploadcare');
                this.button.addCallback(button, this.uploadcare.show);

                // using Font Awesome, sets the default icon
                // for usage with Semantic UI, change second argument to desired icon class (e.g. 'attach icon')
                this.button.setAwesome('uploadcare', 'fa-cloud-download');
            },

            show: function() {
                var dialog = uploadcare.openDialog({}, $opts);
                this.selection.save();
                dialog.done(this.uploadcare.done)
            },

            done: function(data) {
                var $this = this;
                var files = $opts.multiple ? data.files() : [data];
                this.selection.restore();
                $.when.apply(null, files).done(function() {
                    $.each(arguments, function() {
                        if ($.isFunction($opts.uploadCompleteCallback)) {
                            $opts.uploadCompleteCallback.call($this, this);
                        } else {
                            var imageUrl = this.cdnUrl;
                            if (this.isImage && ! this.cdnUrlModifiers) {
                                imageUrl += '-/preview/';
                            }
                            if (this.isImage) {
                                $this.insert.html('<img src="' + imageUrl + '" alt="' + this.name + '" />', false);
                            } else {
                                $this.insert.html('<a href="' + this.cdnUrl + '">' + this.name + '</a>', false);
                            }
                        }
                  });
                });
            },
        };
    };
})(jQuery);


//predefined links
(function($)
{
    $.Redactor.prototype.definedlinks = function()
    {
        return {
            init: function()
            {
                if (!this.opts.definedLinks) return;

                this.modal.addCallback('link', $.proxy(this.definedlinks.load, this));

            },
            load: function()
            {
                var $select = $('<select id="redactor-defined-links" />');
                $('#redactor-modal-link-insert').prepend($select);

                this.definedlinks.storage = {};

                $.getJSON(this.opts.definedLinks, $.proxy(function(data)
                {
                    $.each(data, $.proxy(function(key, val)
                    {
                        this.definedlinks.storage[key] = val;
                        $select.append($('<option>').val(key).html(val.name));

                    }, this));

                    $select.on('change', $.proxy(this.definedlinks.select, this));

                }, this));

            },
            select: function(e)
            {
                var key = $(e.target).val();
                var name = '', url = '';
                if (key !== 0)
                {
                    name = this.definedlinks.storage[key].name;
                    url = this.definedlinks.storage[key].url;
                }

                $('#redactor-link-url').val(url);

                var $el = $('#redactor-link-url-text');
                if ($el.val() === '') $el.val(name);
            }
        };
    };
})(jQuery);

!function(t){t.Redactor.prototype.filemanager=function(){return{init:function(){this.opts.fileManagerJson&&this.modal.addCallback("file",this.filemanager.load)},load:function(){var e=this.modal.getModal();this.modal.createTabber(e),this.modal.addTab(1,"Upload","active"),this.modal.addTab(2,"Choose"),t("#redactor-modal-file-upload-box").addClass("redactor-tab redactor-tab1");var i=t('<div id="redactor-file-manager-box" style="overflow: auto; height: 300px;" class="redactor-tab redactor-tab2">').hide();e.append(i),t.ajax({dataType:"json",cache:!1,url:this.opts.fileManagerJson,success:t.proxy(function(e){var i=t('<ul id="redactor-modal-list">');t.each(e,t.proxy(function(e,o){var r=t('<a href="#" title="'+o.title+'" rel="'+o.link+'" class="redactor-file-manager-link">'+o.title+' <span style="font-size: 11px; color: #888;">'+o.name+'</span> <span style="position: absolute; right: 10px; font-size: 11px; color: #888;">('+o.size+")</span></a>"),s=t("<li />");r.on("click",t.proxy(this.filemanager.insert,this)),s.append(r),i.append(s)},this)),t("#redactor-file-manager-box").append(i)},this)})},insert:function(e){e.preventDefault();var i=t(e.target).closest(".redactor-file-manager-link");this.file.insert('<a href="'+i.attr("rel")+'">'+i.attr("title")+"</a>")}}}}(jQuery),function(t){t.Redactor.prototype.fontcolor=function(){return{init:function(){for(var t=["#ffffff","#000000","#eeece1","#1f497d","#4f81bd","#c0504d","#9bbb59","#8064a2","#4bacc6","#f79646","#ffff00","#f2f2f2","#7f7f7f","#ddd9c3","#c6d9f0","#dbe5f1","#f2dcdb","#ebf1dd","#e5e0ec","#dbeef3","#fdeada","#fff2ca","#d8d8d8","#595959","#c4bd97","#8db3e2","#b8cce4","#e5b9b7","#d7e3bc","#ccc1d9","#b7dde8","#fbd5b5","#ffe694","#bfbfbf","#3f3f3f","#938953","#548dd4","#95b3d7","#d99694","#c3d69b","#b2a2c7","#b7dde8","#fac08f","#f2c314","#a5a5a5","#262626","#494429","#17365d","#366092","#953734","#76923c","#5f497a","#92cddc","#e36c09","#c09100","#7f7f7f","#0c0c0c","#1d1b10","#0f243e","#244061","#632423","#4f6128","#3f3151","#31859b","#974806","#7f6000"],e=["fontcolor","backcolor"],i=0;2>i;i++){var o=e[i],r=this.button.add(o,this.lang.get(o)),s=this.button.addDropdown(r);s.width(242),this.fontcolor.buildPicker(s,o,t)}},buildPicker:function(e,i,o){for(var r="backcolor"==i?"background-color":"color",s=o.length,a=this,n=function(e){e.preventDefault(),a.fontcolor.set(t(this).data("rule"),t(this).attr("rel"))},l=0;s>l;l++){var c=o[l],d=t('<a rel="'+c+'" data-rule="'+r+'" href="#" style="float: left; font-size: 0; border: 2px solid #fff; padding: 0; margin: 0; width: 22px; height: 22px;"></a>');d.css("background-color",c),d.on("click",n),e.append(d)}var h=t('<a href="#" style="display: block; clear: both; padding: 5px; font-size: 12px; line-height: 1;"></a>').html(this.lang.get("none"));h.on("click",t.proxy(function(t){t.preventDefault(),this.fontcolor.remove(r)},this)),e.append(h)},set:function(t,e){this.inline.format("span","style",t+": "+e+";")},remove:function(t){this.inline.removeStyleRule(t)}}}}(jQuery),function(t){t.Redactor.prototype.fontfamily=function(){return{init:function(){var e=["Arial","Helvetica","Georgia","Times New Roman","Monospace"],i=this,o={};t.each(e,function(t,e){o["s"+t]={title:e,func:function(){i.fontfamily.set(e)}}}),o.remove={title:"Remove Font Family",func:i.fontfamily.reset};var r=this.button.add("fontfamily","Change Font Family");this.button.addDropdown(r,o)},set:function(t){this.inline.format("span","style","font-family:"+t+";")},reset:function(){this.inline.removeStyleRule("font-family")}}}}(jQuery),function(t){t.Redactor.prototype.fontsize=function(){return{init:function(){var e=[10,11,12,14,16,18,20,24,28,30],i=this,o={};t.each(e,function(t,e){o["s"+t]={title:e+"px",func:function(){i.fontsize.set(e)}}}),o.remove={title:"Remove Font Size",func:i.fontsize.reset};var r=this.button.add("fontsize","Change Font Size");this.button.addDropdown(r,o)},set:function(t){this.inline.format("span","style","font-size: "+t+"px;")},reset:function(){this.inline.removeStyleRule("font-size")}}}}(jQuery),function(t){t.Redactor.prototype.fullscreen=function(){return{init:function(){this.fullscreen.isOpen=!1;var t=this.button.add("fullscreen","Fullscreen");this.button.addCallback(t,this.fullscreen.toggle),this.opts.fullscreen&&this.fullscreen.toggle()},enable:function(){this.button.changeIcon("fullscreen","normalscreen"),this.button.setActive("fullscreen"),this.fullscreen.isOpen=!0,this.opts.toolbarExternal&&(this.fullscreen.toolcss={},this.fullscreen.boxcss={},this.fullscreen.toolcss.width=this.$toolbar.css("width"),this.fullscreen.toolcss.top=this.$toolbar.css("top"),this.fullscreen.toolcss.position=this.$toolbar.css("position"),this.fullscreen.boxcss.top=this.$box.css("top")),this.fullscreen.height=this.$editor.height(),this.opts.maxHeight&&this.$editor.css("max-height",""),this.opts.minHeight&&this.$editor.css("min-height",""),this.$fullscreenPlaceholder||(this.$fullscreenPlaceholder=t("<div/>")),this.$fullscreenPlaceholder.insertAfter(this.$box),this.$box.appendTo(document.body),this.$box.addClass("redactor-box-fullscreen"),t("body, html").css("overflow","hidden"),this.fullscreen.resize(),t(window).on("resize.redactor.fullscreen",t.proxy(this.fullscreen.resize,this)),t(document).scrollTop(0,0),t(".redactor-toolbar-tooltip").hide(),this.$editor.focus(),this.observe.load()},disable:function(){this.button.removeIcon("fullscreen","normalscreen"),this.button.setInactive("fullscreen"),this.fullscreen.isOpen=!1,t(window).off("resize.redactor.fullscreen"),t("body, html").css("overflow",""),this.$box.insertBefore(this.$fullscreenPlaceholder),this.$fullscreenPlaceholder.remove(),this.$box.removeClass("redactor-box-fullscreen").css({width:"auto",height:"auto"}),this.code.sync(),this.opts.toolbarExternal&&(this.$box.css("top",this.fullscreen.boxcss.top),this.$toolbar.css({width:this.fullscreen.toolcss.width,top:this.fullscreen.toolcss.top,position:this.fullscreen.toolcss.position})),this.opts.minHeight&&this.$editor.css("minHeight",this.opts.minHeight),this.opts.maxHeight&&this.$editor.css("maxHeight",this.opts.maxHeight),t(".redactor-toolbar-tooltip").hide(),this.$editor.css("height","auto"),this.$editor.focus(),this.observe.load()},toggle:function(){this.fullscreen.isOpen?this.fullscreen.disable():this.fullscreen.enable()},resize:function(){if(this.fullscreen.isOpen){var e=this.$toolbar.height(),i=t(window).height()-e-this.utils.normalize(this.$editor.css("padding-top"))-this.utils.normalize(this.$editor.css("padding-bottom"));this.$box.width(t(window).width()).height(i),this.opts.toolbarExternal&&(this.$toolbar.css({top:"0px",position:"absolute",width:"100%"}),this.$box.css("top",e+"px")),this.$editor.height(i)}}}}}(jQuery),function(t){t.Redactor.prototype.imagemanager=function(){return{init:function(){this.opts.imageManagerJson&&this.modal.addCallback("image",this.imagemanager.load)},load:function(){var e=this.modal.getModal();this.modal.createTabber(e),this.modal.addTab(1,"Upload","active"),this.modal.addTab(2,"Choose"),t("#redactor-modal-image-droparea").addClass("redactor-tab redactor-tab1");var i=t('<div id="redactor-image-manager-box" style="overflow: auto; height: 300px;" class="redactor-tab redactor-tab2">').hide();e.append(i),t.ajax({dataType:"json",cache:!1,url:this.opts.imageManagerJson,success:t.proxy(function(e){t.each(e,t.proxy(function(e,i){var o="";"undefined"!=typeof i.title&&(o=i.title);var r=t('<img src="'+i.thumb+'" rel="'+i.image+'" title="'+o+'" style="width: 100px; height: 75px; cursor: pointer;" />');t("#redactor-image-manager-box").append(r),t(r).click(t.proxy(this.imagemanager.insert,this))},this))},this)})},insert:function(e){this.image.insert('<img src="'+t(e.target).attr("rel")+'" alt="'+t(e.target).attr("title")+'">')}}}}(jQuery),function(t){t.Redactor.prototype.limiter=function(){return{init:function(){this.opts.limiter&&this.$editor.on("keydown.redactor-limiter",t.proxy(function(t){var e=t.which,i=t.ctrlKey||t.metaKey;if(!(e==this.keyCode.BACKSPACE||e==this.keyCode.DELETE||e==this.keyCode.ESC||e==this.keyCode.SHIFT||i&&65==e||i&&82==e||i&&116==e)){var o=this.$editor.text().length;return o>=this.opts.limiter?!1:void 0}},this))}}}}(jQuery),function(t){t.Redactor.prototype.table=function(){return{getTemplate:function(){return String()+'<section id="redactor-modal-table-insert"><label>'+this.lang.get("rows")+'</label><input type="text" size="5" value="2" id="redactor-table-rows" /><label>'+this.lang.get("columns")+'</label><input type="text" size="5" value="3" id="redactor-table-columns" /></section>'},init:function(){var t={};t.insert_table={title:this.lang.get("insert_table"),func:this.table.show,observe:{element:"table","in":{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.insert_row_above={title:this.lang.get("insert_row_above"),func:this.table.addRowAbove,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.insert_row_below={title:this.lang.get("insert_row_below"),func:this.table.addRowBelow,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.insert_column_left={title:this.lang.get("insert_column_left"),func:this.table.addColumnLeft,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.insert_column_right={title:this.lang.get("insert_column_right"),func:this.table.addColumnRight,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.add_head={title:this.lang.get("add_head"),func:this.table.addHead,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.delete_head={title:this.lang.get("delete_head"),func:this.table.deleteHead,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.delete_column={title:this.lang.get("delete_column"),func:this.table.deleteColumn,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.delete_row={title:this.lang.get("delete_row"),func:this.table.deleteRow,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},t.delete_table={title:this.lang.get("delete_table"),func:this.table.deleteTable,observe:{element:"table",out:{attr:{"class":"redactor-dropdown-link-inactive","aria-disabled":!0}}}},this.observe.addButton("td","table"),this.observe.addButton("th","table");var e=this.button.addBefore("link","table",this.lang.get("table"));this.button.addDropdown(e,t)},show:function(){this.modal.addTemplate("table",this.table.getTemplate()),this.modal.load("table",this.lang.get("insert_table"),300),this.modal.createCancelButton();var e=this.modal.createActionButton(this.lang.get("insert"));e.on("click",this.table.insert),this.selection.save(),this.modal.show(),t("#redactor-table-rows").focus()},insert:function(){this.placeholder.remove();var e,i,o,r,s=t("#redactor-table-rows").val(),a=t("#redactor-table-columns").val(),n=t("<div>"),l=Math.floor(99999*Math.random()),c=t('<table id="table'+l+'"><tbody></tbody></table>');for(e=0;s>e;e++){for(i=t("<tr>"),o=0;a>o;o++)r=t("<td>"+this.opts.invisibleSpace+"</td>"),0===e&&0===o&&r.append(this.selection.getMarker()),t(i).append(r);c.append(i)}n.append(c);var d=n.html();if(this.modal.close(),this.selection.restore(),!this.table.getTable()){this.buffer.set();var h=this.selection.getBlock()||this.selection.getCurrent();h&&"BODY"!=h.tagName?("LI"==h.tagName&&(h=t(h).closest("ul, ol")),t(h).after(d)):this.insert.html(d,!1),this.selection.restore();var f=this.$editor.find("#table"+l),u=f.prev("p");if(u.length>0&&this.utils.isEmpty(u.html())&&u.remove(),!this.opts.linebreaks&&(this.utils.browser("mozilla")||this.utils.browser("msie"))){var b=f.next();0===b.length&&f.after(this.opts.emptyHtml)}this.observe.buttons(),f.find("span.redactor-selection-marker").remove(),f.removeAttr("id"),this.code.sync(),this.core.setCallback("insertedTable",f)}},getTable:function(){var e=t(this.selection.getParent()).closest("table");return this.utils.isRedactorParent(e)?0===e.size()?!1:e:!1},restoreAfterDelete:function(t){this.selection.restore(),t.find("span.redactor-selection-marker").remove(),this.code.sync()},deleteTable:function(){var t=this.table.getTable();if(t){this.buffer.set();var e=t.next();this.opts.linebreaks||0===e.length?this.caret.setAfter(t):this.caret.setStart(e),t.remove(),this.code.sync()}},deleteRow:function(){var e=this.table.getTable();if(e){var i=t(this.selection.getCurrent());this.buffer.set();var o=i.closest("tr"),r=o.prev().length?o.prev():o.next();if(r.length){var s=r.children("td, th").first();s.length&&s.prepend(this.selection.getMarker())}o.remove(),this.table.restoreAfterDelete(e)}},deleteColumn:function(){var e=this.table.getTable();if(e){this.buffer.set();var i=t(this.selection.getCurrent()),o=i.closest("td, th"),r=o[0].cellIndex;e.find("tr").each(t.proxy(function(e,i){var o=t(i),s=0>r-1?r+1:r-1;0===e&&o.find("td, th").eq(s).prepend(this.selection.getMarker()),o.find("td, th").eq(r).remove()},this)),this.table.restoreAfterDelete(e)}},addHead:function(){var e=this.table.getTable();if(e){if(this.buffer.set(),0!==e.find("thead").size())return void this.table.deleteHead();var i=e.find("tr").first().clone();i.find("td").replaceWith(t.proxy(function(){return t("<th>").html(this.opts.invisibleSpace)},this)),$thead=t("<thead></thead>").append(i),e.prepend($thead),this.code.sync()}},deleteHead:function(){var t=this.table.getTable();if(t){var e=t.find("thead");0!==e.size()&&(this.buffer.set(),e.remove(),this.code.sync())}},addRowAbove:function(){this.table.addRow("before")},addRowBelow:function(){this.table.addRow("after")},addColumnLeft:function(){this.table.addColumn("before")},addColumnRight:function(){this.table.addColumn("after")},addRow:function(e){var i=this.table.getTable();if(i){this.buffer.set();var o=t(this.selection.getCurrent()),r=o.closest("tr"),s=r.clone();s.find("th").replaceWith(function(){var e=t("<td>");return e[0].attributes=this.attributes,e.append(t(this).contents())}),s.find("td").html(this.opts.invisibleSpace),"after"==e?r.after(s):r.before(s),this.code.sync()}},addColumn:function(e){var i=this.table.getTable();if(i){var o=0,r=t(this.selection.getCurrent());this.buffer.set();var s=r.closest("tr"),a=r.closest("td, th");s.find("td, th").each(t.proxy(function(e,i){t(i)[0]===a[0]&&(o=e)},this)),i.find("tr").each(t.proxy(function(i,r){var s=t(r).find("td, th").eq(o),a=s.clone();a.html(this.opts.invisibleSpace),"after"==e?s.after(a):s.before(a)},this)),this.code.sync()}}}}}(jQuery),function(t){t.Redactor.prototype.textdirection=function(){return{init:function(){var t=this,e={};e.ltr={title:"Left to Right",func:t.textdirection.setLtr},e.rtl={title:"Right to Left",func:t.textdirection.setRtl};var i=this.button.add("textdirection","Change Text Direction");this.button.addDropdown(i,e)},setRtl:function(){this.buffer.set(),this.block.setAttr("dir","rtl")},setLtr:function(){this.buffer.set(),this.block.removeAttr("dir")}}}}(jQuery),function(t){t.Redactor.prototype.textexpander=function(){return{init:function(){this.opts.textexpander&&this.$editor.on("keyup.redactor-limiter",t.proxy(function(e){var i=e.which;if(i==this.keyCode.SPACE){var o=this.textexpander.getCurrent(),r=t(o).clone(),s=t("<div>");s.html(r);var a=s.html();s.remove();for(var n=this.opts.textexpander.length,l=0,c=0;n>c;c++){var d=new RegExp(this.opts.textexpander[c][0]);if(-1!=a.search(d)){l++,a=a.replace(d,this.opts.textexpander[c][1]),s=t("<div>"),s.html(a),s.append(this.selection.getMarker());var h=s.html().replace(/&nbsp;/,"");t(o).replaceWith(h),s.remove()}}0!==l&&this.selection.restore()}},this))},getCurrent:function(){var t;return window.getSelection?t=window.getSelection():document.selection&&"Control"!=document.selection.type&&(t=document.selection),this.utils.browser("mozilla")?t.anchorNode.previousSibling:t.anchorNode}}}}(jQuery),function(t){t.Redactor.prototype.video=function(){return{reUrlYoutube:/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,reUrlVimeo:/https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,getTemplate:function(){return String()+'<section id="redactor-modal-video-insert"><label>'+this.lang.get("video_html_code")+'</label><textarea id="redactor-insert-video-area" style="height: 160px;"></textarea></section>'},init:function(){var t=this.button.addAfter("image","video",this.lang.get("video"));this.button.addCallback(t,this.video.show)},show:function(){this.modal.addTemplate("video",this.video.getTemplate()),this.modal.load("video",this.lang.get("video"),700),this.modal.createCancelButton();var e=this.modal.createActionButton(this.lang.get("insert"));e.on("click",this.video.insert),this.selection.save(),this.modal.show(),t("#redactor-insert-video-area").focus()},insert:function(){var e=t("#redactor-insert-video-area").val();if(!e.match(/<iframe|<video/gi)){e=this.clean.stripTags(e);var i='<iframe style="width: 500px; height: 281px;" src="',o='" frameborder="0" allowfullscreen></iframe>';e.match(this.video.reUrlYoutube)?e=e.replace(this.video.reUrlYoutube,i+"//www.youtube.com/embed/$1"+o):e.match(this.video.reUrlVimeo)&&(e=e.replace(this.video.reUrlVimeo,i+"//player.vimeo.com/video/$2"+o))}this.selection.restore(),this.modal.close();var r=this.selection.getBlock()||this.selection.getCurrent();r?t(r).after(e):this.insert.html(e),this.code.sync()}}}}(jQuery),function(t){t.Redactor.prototype.counter=function(){return{init:function(){this.opts.counterCallback&&this.$editor.on("keyup.redactor-limiter",t.proxy(function(){var e=0,i=0,o=0,r=this.code.get(),s=r.replace(/<\/(.*?)>/gi," ");if(s=s.replace(/<(.*?)>/gi,""),s=s.replace(/\t/gi,""),s=s.replace(/\n/gi," "),s=s.replace(/\r/gi," "),s=t.trim(s),""!==s){var a=s.split(/\s+/),n=s.match(/\s/g);a&&(e=a.length),n&&(o=n.length),i=s.length}this.core.setCallback("counter",{words:e,characters:i,spaces:o})},this))}}}}(jQuery);