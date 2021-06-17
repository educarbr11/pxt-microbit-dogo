/**
 * Adapted from lancaster-university/codal-microbit-v2
 * https://github.com/lancaster-university/codal-microbit-v2/blob/master/source/SoundExpressions.cpp#L286
 */
namespace pxsim.music.builtin {
    const giggle = "giggle";
    const giggleData = "010230988019008440044008881023001601003300240000000000000000000000000000,110232570087411440044008880352005901003300010000000000000000010000000000,310232729021105440288908880091006300000000240700020000000000003000000000,310232729010205440288908880091006300000000240700020000000000003000000000,310232729011405440288908880091006300000000240700020000000000003000000000";
    const happy = "happy";
    const happyData = "010231992066911440044008880262002800001800020500000000000000010000000000,002322129029508440240408880000000400022400110000000000000000007500000000,000002129029509440240408880145000400022400110000000000000000007500000000";
    const hello = "hello";
    const helloData = "310230673019702440118708881023012800000000240000000000000000000000000000,300001064001602440098108880000012800000100040000000000000000000000000000,310231064029302440098108881023012800000100040000000000000000000000000000";
    const mysterious = "mysterious";
    const mysteriousData = "400002390033100440240408880477000400022400110400000000000000008000000000,405512845385000440044008880000012803010500160000000000000000085000500015";
    const sad = "sad";
    const sadData = "310232226070801440162408881023012800000100240000000000000000000000000000,310231623093602440093908880000012800000100240000000000000000000000000000";
    const slide = "slide";
    const slideData = "105202325022302440240408881023012801020000110400000000000000010000000000,010232520091002440044008881023012801022400110400000000000000010000000000";
    const soaring = "soaring";
    const soaringData = "210234009530905440599908881023002202000400020250000000000000020000000000,402233727273014440044008880000003101024400030000000000000000000000000000";
    const spring = "spring";
    const springData = "306590037116312440058708880807003400000000240000000000000000050000000000,010230037116313440058708881023003100000000240000000000000000050000000000";
    const twinkle = "twinkle";
    const twinkleData = "010180007672209440075608880855012800000000240000000000000000000000000000";
    const yawn = "yawn";
    const yawnData = "200002281133202440150008881023012801024100240400030000000000010000000000,005312520091002440044008880636012801022400110300000000000000010000000000,008220784019008440044008880681001600005500240000000000000000005000000000,004790784019008440044008880298001600000000240000000000000000005000000000,003210784019008440044008880108001600003300080000000000000000005000000000";

    export function lookupBuiltIn(sound: string) {
        if (sound == giggle)
            return giggleData;
        if (sound == happy)
            return happyData;
        if (sound == hello)
            return helloData;
        if (sound == mysterious)
            return mysteriousData;
        if (sound == sad)
            return sadData;
        if (sound == slide)
            return slideData;
        if (sound == soaring)
            return soaringData;
        if (sound == spring)
            return springData;
        if (sound == twinkle)
            return twinkleData;
        if (sound == yawn)
            return yawnData;
        return sound;
    }
}