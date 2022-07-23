import Action from '../interfaces/action'


const actions: Array<Action> = [
    {
        id: 1,
        label: "研究をする",
        required_cost: 0,
        required_time: 1.0,
        happiness: 0.0
    },
    {
        id: 2,
        label: "サッカーをする",
        required_cost: 0,
        required_time: 2.0,
        happiness: 0.0
    },
    {
        id: 3,
        label: "野球をする",
        required_cost: 0,
        required_time: 2.0,
        happiness: 0.0
    },
    {
        id: 4,
        label: "ボランティアをする",
        required_cost: 0,
        required_time: 4.0,
        happiness: 0.0
    },
    {
        id: 5,
        label: "YouTubeを観る",
        required_cost: 0,
        required_time: 0.25,
        happiness: 0.25
    },
    {
        id: 6,
        label: "SNSをする",
        required_cost: 0,
        required_time: 0.25,
        happiness: 0.25
    },
    {
        id: 7,
        label: "散歩をする",
        required_cost: 0,
        required_time: 0.5,
        happiness: 0.5
    },
    {
        id: 8,
        label: "昼寝をする",
        required_cost: 0,
        required_time: 1.0,
        happiness: 0.5
    },
    {
        id: 9,
        label: "小説を読む",
        required_cost: 0,
        required_time: 0.5,
        happiness: 0.75
    },
    {
        id: 10,
        label: "アニメを観る",
        required_cost: 0,
        required_time: 0.5,
        happiness: 0.75
    },
    {
        id: 11,
        label: "マンガを読む",
        required_cost: 0,
        required_time: 0.5,
        happiness: 1.0
    },
    {
        id: 12,
        label: "ゲームをプレイする",
        required_cost: 0,
        required_time: 1.0,
        happiness: 1.0
    },
    {
        id: 13,
        label: "テレビを観る",
        required_cost: 0,
        required_time: 1.0,
        happiness: 1.0
    },
    {
        id: 14,
        label: "ラジオを聴く",
        required_cost: 0,
        required_time: 1.0,
        happiness: 1.0
    },
    {
        id: 15,
        label: "将棋を指す",
        required_cost: 0,
        required_time: 1.0,
        happiness: 1.0
    },
    {
        id: 16,
        label: "プログラミングする",
        required_cost: 0,
        required_time: 1.0,
        happiness: 3.0
    },
    {
        id: 17,
        label: "映画を観る",
        required_cost: 0,
        required_time: 2.5,
        happiness: 5.0
    },
    {
        id: 18,
        label: "カフェでコーヒーを飲む",
        required_cost: 500,
        required_time: 1.0,
        happiness: 1.5
    },
    {
        id: 19,
        label: "ドライブに行く",
        required_cost: 500,
        required_time: 2.0,
        happiness: 0.0
    },
    {
        id: 20,
        label: "カフェでパフェを食べる",
        required_cost: 800,
        required_time: 1.0,
        happiness: 1.5
    },
    {
        id: 21,
        label: "カラオケに行く",
        required_cost: 800,
        required_time: 1.0,
        happiness: 2.0
    },
    {
        id: 22,
        label: "美術館博物館に行く",
        required_cost: 800,
        required_time: 1.0,
        happiness: 2.0
    },
    {
        id: 23,
        label: "山登りに行く",
        required_cost: 1000,
        required_time: 4.0,
        happiness: 0.0
    },
    {
        id: 24,
        label: "本を買う",
        required_cost: 1200,
        required_time: 0.0,
        happiness: 1.0
    },
    {
        id: 25,
        label: "ランチに贅沢をする",
        required_cost: 1500,
        required_time: 1.0,
        happiness: 2.0
    },
    {
        id: 26,
        label: "映画館に行く",
        required_cost: 1500,
        required_time: 2.5,
        happiness: 10.0
    },
    {
        id: 27,
        label: "釣りをする",
        required_cost: 2000,
        required_time: 4.0,
        happiness: 8.0
    },
    {
        id: 28,
        label: "服を買う",
        required_cost: 2500,
        required_time: 0.0,
        happiness: 0.0
    },
    {
        id: 29,
        label: "ジムに通う",
        required_cost: 3000,
        required_time: 1.0,
        happiness: 1.0
    },
    {
        id: 30,
        label: "マッサージエステに通う",
        required_cost: 4000,
        required_time: 1.0,
        happiness: 3.0
    },
    {
        id: 31,
        label: "パチンコをする",
        required_cost: 5000,
        required_time: 1.0,
        happiness: 0.0
    },
    {
        id: 32,
        label: "友達と呑みに行く",
        required_cost: 5000,
        required_time: 3.0,
        happiness: 4.0
    },
    {
        id: 33,
        label: "コンサートに行く",
        required_cost: 7000,
        required_time: 2.0,
        happiness: 0.0
    },
    {
        id: 34,
        label: "ガジェットを買う",
        required_cost: 20000,
        required_time: 0.0,
        happiness: 10.0
    },
    {
        id: 35,
        label: "夜の街に繰り出す",
        required_cost: 20000,
        required_time: 3.0,
        happiness: 0.0
    },
    {
        id: 36,
        label: "国内旅行に行く",
        required_cost: 80000,
        required_time: 72.0,
        happiness: 168.0
    },
    {
        id: 37,
        label: "パソコンを買い替える",
        required_cost: 150000,
        required_time: 0.0,
        happiness: 168.0
    },
    {
        id: 38,
        label: "海外旅行に行く",
        required_cost: 300000,
        required_time: 120.0,
        happiness: 8760.0
    }
]
export default actions