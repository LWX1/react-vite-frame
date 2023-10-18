/***
 * 发布订阅系统
 * subList 存储所有的订阅名字和方法数组
 */
class pubSub {
	subList: { [key: string]: any } = {};
	// constructor() {}
	// 订阅 bool 判断是否为重新订阅
	subscribe(key:string, fn:Function, bool = false) {
		if (!this.subList[key] || bool) {
			this.subList[key] = [];
		}
		this.subList[key].push(fn);
	}
	// 发布
	publish(key: string, ...args: any[]) {
		(this.subList[key] || []).forEach((item:any) => {
			try {
				item.apply(this, args);
			} catch (e) {
				console.warn(e);
			}
		});
	}
	// 取消订阅
	unSubscribe(key:string, fn:Function) {
		// 取消所有订阅
		if (!key) {
			this.subList = {};
			return false;
		}
		const fnList = this.subList[key];
		if (!fnList) return false;

		// 不传函数则清空所有
		if (!fn) {
			this.subList[key] = [];
			// 过滤函数
		} else {
			this.subList[key] = fnList.filter((item: Function) => item !== fn);
		}
	}
};

export let SubInfo = new pubSub();
