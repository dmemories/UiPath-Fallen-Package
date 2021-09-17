const CLICK_TYPE = 0;
const CLICKIMG_TYPE = 1;
const TYPEINTO_TYPE = 2;
const ONELEMENT_EXIST_TYPE = 3;
const WAIT_IMGVANISH_TYPE = 4;
const ON_IMGAPPEAR_TYPE = 5;
const ON_IMGVANISH_TYPE = 6;
const IMG_EXIST_TYPE = 7;
const ELEMENT_EXIST_TYPE = 8;
const SEND_HOYKEY_TYPE = 9;
const GET_ATTRIBUTE_TYPE = 10;
const GET_VALUE_TYPE = 11;
const TAKESCREEN_TYPE = 12;

const doObjArr = [
    { type: CLICK_TYPE, openTag: "<ui:Click.Target>", closeTag: "</ui:Click.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS', 'WaitForReady'] },
    { type: CLICKIMG_TYPE, openTag: "<ui:ClickImage.Target>", closeTag: "</ui:ClickImage.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS', 'WaitForReady'] },
    { type: TYPEINTO_TYPE, openTag: "<ui:TypeInto.Target>", closeTag: "</ui:TypeInto.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS', 'WaitForReady'] },
    { type: ONELEMENT_EXIST_TYPE, openTag: "<ui:OnUiElementAppear.Target>", closeTag: "</ui:OnUiElementAppear.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS'] },
    { type: WAIT_IMGVANISH_TYPE, openTag: "<ui:WaitImageVanish.Target>", closeTag: "</ui:WaitImageVanish.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS'] },
    { type: ON_IMGAPPEAR_TYPE, openTag: "<ui:OnImageAppear.Target>", closeTag: "</ui:OnImageAppear.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS'] },
    { type: ON_IMGVANISH_TYPE, openTag: "<ui:OnImageVanish.Target>", closeTag: "</ui:OnImageVanish.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS'] },
    { type: IMG_EXIST_TYPE, openTag: "<ui:ImageFound.Target>", closeTag: "</ui:ImageFound.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS'] },
    { type: ELEMENT_EXIST_TYPE, openTag: "<ui:UiElementExists.Target>", closeTag: "</ui:UiElementExists.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS'] },
    { type: SEND_HOYKEY_TYPE, openTag: "<ui:SendHotkey.Target>", closeTag: "</ui:SendHotkey.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS', 'WaitForReady'] },
    { type: GET_ATTRIBUTE_TYPE, openTag: "<ui:GetAttribute.Target>", closeTag: "</ui:GetAttribute.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS'] },
    { type: GET_VALUE_TYPE, openTag: "<ui:GetValue.Target>", closeTag: "</ui:GetValue.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS'] },
    { type: TAKESCREEN_TYPE, openTag: "<ui:TakeScreenshot.Target>", closeTag: "</ui:TakeScreenshot.Target>", typeAtbArr: ['ClippingRegion', 'Element', 'Selector', 'TimeoutMS', 'WaitForReady'] }
]

function getAtbVal(eleStr, atbName) {
    let findAtb = `${atbName}="`
    let atbIndex = eleStr.indexOf(findAtb)
    if (atbIndex < 0) {
        switch (atbName) {
            case 'WaitForReady': return 'INTERACTIVE';
            case 'TimeoutMS': return '{x:Null}';
            case 'Id': return '';
            default:
                console.log(`!NOT FOUND ATBNAME (${atbName}) !`)
                return '';
        }
    }
    atbIndex = atbIndex + findAtb.length
    let endIndex = eleStr.indexOf('"', atbIndex)
    return eleStr.substring(atbIndex, endIndex)
}

function getFallenTag(tagVal, type, atbArr) {
    let resultStr;
    switch (type) {
        case CLICK_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="{WaitForReady}" />'; break;
        case CLICKIMG_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="{WaitForReady}" />'; break;
        case TYPEINTO_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="{WaitForReady}" />'; break;
        case ONELEMENT_EXIST_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="COMPLETE" />'; break;
        case WAIT_IMGVANISH_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="COMPLETE" />'; break;
        case ON_IMGAPPEAR_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="COMPLETE" />'; break;
        case ON_IMGVANISH_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="COMPLETE" />'; break;
        case IMG_EXIST_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="COMPLETE" />'; break;
        case ELEMENT_EXIST_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="COMPLETE" />'; break;
        case SEND_HOYKEY_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="{WaitForReady}" />'; break;
        case GET_ATTRIBUTE_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="COMPLETE" />'; break;
        case GET_VALUE_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="COMPLETE" />'; break;
        case TAKESCREEN_TYPE: resultStr = '<ui:Target ClippingRegion="{ClippingRegion}" Element="{Element}" Selector="{Selector}" TimeoutMS="{TimeoutMS}" WaitForReady="{WaitForReady}" />'; break;
        
        default:
            console.log('#ERROR')
            return;
    }
    for (atb of atbArr) resultStr = resultStr.replace(`{${atb}}`, getAtbVal(tagVal, atb));
    return resultStr
}

function replaceRun(inputTxt, openTag, closeTag, type, typeAtbArr) {
    let nextIndex = 0
    
    do {
        let stratTagIndex = inputTxt.indexOf(openTag, nextIndex)
        if (stratTagIndex < 0) break;
        stratTagIndex += openTag.length
        let endTagIndex = inputTxt.indexOf(closeTag, stratTagIndex)
        let beforeStr = inputTxt.substring(0, stratTagIndex)
        let remainStr = inputTxt.substring(endTagIndex)
        let tagVal = inputTxt.substring(stratTagIndex, endTagIndex)
        if (getAtbVal(tagVal, "Id").length < 1) break;
        
        let replaceStr = getFallenTag(tagVal, type, typeAtbArr)
        nextIndex = stratTagIndex + replaceStr.length
        inputTxt = beforeStr + replaceStr + remainStr
    } while (1);
    return inputTxt;
}

function getReplaceSomeAtb(txt) {
  let replaceTxt = ''
  let findTxt = ' AlterIfDisabled="{x:Null}"'
  while (txt.indexOf(findTxt) > -1) { txt = txt.replace(findTxt, replaceTxt); }
  findTxt = ' AlterIfDisabled="True"'
  while (txt.indexOf(findTxt) > -1) { txt = txt.replace(findTxt, replaceTxt); }
  findTxt = ' AlterIfDisabled="False"'
  while (txt.indexOf(findTxt) > -1) { txt = txt.replace(findTxt, replaceTxt); }
  
  findTxt = 'SendWindowMessages="{x:Null}"'
  replaceTxt = 'SendWindowMessages="False"'
  while (txt.indexOf(findTxt) > -1) { txt = txt.replace(findTxt, replaceTxt); }
  findTxt = ' InitialScalingFactor="1.25"'
  replaceTxt = ''
  while (txt.indexOf(findTxt) > -1) { txt = txt.replace(findTxt, replaceTxt); }
  findTxt = ' Profile="Basic"'
  replaceTxt = ''
  while (txt.indexOf(findTxt) > -1) { txt = txt.replace(findTxt, replaceTxt); }

  findTxt = 'WaitActive="{x:Null}"'
  replaceTxt = 'WaitActive="False"'
  while (txt.indexOf(findTxt) > -1) { txt = txt.replace(findTxt, replaceTxt); }
  findTxt = 'WaitVisible="{x:Null}"'
  replaceTxt = 'WaitVisible="False"'
  while (txt.indexOf(findTxt) > -1) { txt = txt.replace(findTxt, replaceTxt); }

  return txt
}

module.exports = function (inputTxt) {
    let result = inputTxt;

    for (doObj of doObjArr) {
      result = replaceRun(result, doObj.openTag, doObj.closeTag, doObj.type, doObj.typeAtbArr)
    }
    result = getReplaceSomeAtb(result)
    return result
}