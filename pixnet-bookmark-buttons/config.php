<?php
$config_data = json_decode(file_get_contents('./options.json'), true);
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh_TW">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>PIXNET Addons</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
        <script src="../libs/js/jquery.query.min.js" type="text/javascript"></script>
        <script src="../libs/js/json2.min.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" href="http://vote.pixplug.in/stylesheets/reset.css?1332756723">
        <link rel="stylesheet" type="text/css" href="../libs/css/style.css?v=d97434c3a528d20f6b5e7f14fe08629a">
    </head>
    <body>
        <div id="popup-body" class="popup-body">
            <div class="content">
                <form id="settings">
                    <table class="settings-table th-large" cellspacing="0">
                        <tbody>
                            <?php foreach ($config_data as $config): ?>
                            <tr>
                                <th><label for="url"><?= $config['desc']['zh_TW'] ?></label></th>
                                <td>
                                    <?php if ('select' == $config['type']): ?>
                                    <select name="<?= $config['name'] ?>">
                                        <?php foreach ($config['elements'] as $value => $element): ?>
                                        <option value="<?= $value ?>"><?= $element['desc']['zh_TW'] ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                            <tr>
                                <th>預覽</th>
                                <td id="demo">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
        <div class="share-panel refresh">
        </div>


        <div id="popup-footer" class="popup-footer">
            <div id="popup-submit-box">
            </div>
        </div>
<script type="text/javascript">
<!--
$(function() {
    $('#settings').find('select').change(function() {
        var div = '<iframe width="100%" height="90" frameborder="0" src="demo.html?' + $('#settings').serialize() + '"></iframe>';
        $('#demo').html(div);
    });
    <?php foreach ($config_data as $config): ?>
    $('select[name="<?= $config['name'] ?>"]').val('<?= $config['default'] ?>');
    <?php endforeach; ?>
    $('#settings').find('select:eq(0)').change();

});
//-->
</script>

    </body>
</html>
