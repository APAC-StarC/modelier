/**
 * Some types of possible point attribute data formats
 *
 * @class
 */
const PointAttributeTypes = {
	DATA_TYPE_DOUBLE: {ordinal: 0, name: "double", size: 8},
	DATA_TYPE_FLOAT:  {ordinal: 1, name: "float",  size: 4},
	DATA_TYPE_INT8:   {ordinal: 2, name: "int8",   size: 1},
	DATA_TYPE_UINT8:  {ordinal: 3, name: "uint8",  size: 1},
	DATA_TYPE_INT16:  {ordinal: 4, name: "int16",  size: 2},
	DATA_TYPE_UINT16: {ordinal: 5, name: "uint16", size: 2},
	DATA_TYPE_INT32:  {ordinal: 6, name: "int32",  size: 4},
	DATA_TYPE_UINT32: {ordinal: 7, name: "uint32", size: 4},
	DATA_TYPE_INT64:  {ordinal: 8, name: "int64",  size: 8},
	DATA_TYPE_UINT64: {ordinal: 9, name: "uint64", size: 8}
};

let i = 0;
for (let obj in PointAttributeTypes) {
	PointAttributeTypes[i] = PointAttributeTypes[obj];
	i++;
}


class PointAttribute{
	
	constructor(name, type, numElements){
		this.name = name;
		this.type = type;
		this.numElements = numElements;
		this.byteSize = this.numElements * this.type.size;
		this.description = "";
		this.range = [Infinity, -Infinity];
	}

}
PointAttribute.POSITION_CARTESIAN = new PointAttribute(
	"POSITION_CARTESIAN", PointAttributeTypes.DATA_TYPE_FLOAT, 3);

PointAttribute.RGBA_PACKED = new PointAttribute(
	"COLOR_PACKED", PointAttributeTypes.DATA_TYPE_INT8, 4);

PointAttribute.COLOR_PACKED = PointAttribute.RGBA_PACKED;

PointAttribute.RGB_PACKED = new PointAttribute(
	"COLOR_PACKED", PointAttributeTypes.DATA_TYPE_INT8, 3);

PointAttribute.NORMAL_FLOATS = new PointAttribute(
	"NORMAL_FLOATS", PointAttributeTypes.DATA_TYPE_FLOAT, 3);

PointAttribute.INTENSITY = new PointAttribute(
	"INTENSITY", PointAttributeTypes.DATA_TYPE_UINT16, 1);

PointAttribute.CLASSIFICATION = new PointAttribute(
	"CLASSIFICATION", PointAttributeTypes.DATA_TYPE_UINT8, 1);

PointAttribute.NORMAL_SPHEREMAPPED = new PointAttribute(
	"NORMAL_SPHEREMAPPED", PointAttributeTypes.DATA_TYPE_UINT8, 2);

PointAttribute.NORMAL_OCT16 = new PointAttribute(
	"NORMAL_OCT16", PointAttributeTypes.DATA_TYPE_UINT8, 2);

PointAttribute.NORMAL = new PointAttribute(
	"NORMAL", PointAttributeTypes.DATA_TYPE_FLOAT, 3);
	
PointAttribute.RETURN_NUMBER = new PointAttribute(
	"RETURN_NUMBER", PointAttributeTypes.DATA_TYPE_UINT8, 1);
	
PointAttribute.NUMBER_OF_RETURNS = new PointAttribute(
	"NUMBER_OF_RETURNS", PointAttributeTypes.DATA_TYPE_UINT8, 1);
	
PointAttribute.SOURCE_ID = new PointAttribute(
	"SOURCE_ID", PointAttributeTypes.DATA_TYPE_UINT16, 1);

PointAttribute.INDICES = new PointAttribute(
	"INDICES", PointAttributeTypes.DATA_TYPE_UINT32, 1);

PointAttribute.SPACING = new PointAttribute(
	"SPACING", PointAttributeTypes.DATA_TYPE_FLOAT, 1);

PointAttribute.GPS_TIME = new PointAttribute(
	"GPS_TIME", PointAttributeTypes.DATA_TYPE_DOUBLE, 1);

const typedArrayMapping = {
	"int8":   Int8Array,
	"int16":  Int16Array,
	"int32":  Int32Array,
	"int64":  Float64Array,
	"uint8":  Uint8Array,
	"uint16": Uint16Array,
	"uint32": Uint32Array,
	"uint64": Float64Array,
	"float":  Float32Array,
	"double": Float64Array,
};

Potree = {};

onmessage = function (event) {

	let {buffer, pointAttributes, scale, min, offset} = event.data;

	let numPoints = buffer.byteLength / pointAttributes.byteSize;
	let view = new DataView(buffer);
	
	let attributeBuffers = {};
	let attributeOffset = 0;

	let bytesPerPoint = 0;
	for (let pointAttribute of pointAttributes.attributes) {
		bytesPerPoint += pointAttribute.byteSize;
	}

	for (let pointAttribute of pointAttributes.attributes) {
		
		if(["POSITION_CARTESIAN", "position"].includes(pointAttribute.name)){
			let buff = new ArrayBuffer(numPoints * 4 * 3);
			let positions = new Float32Array(buff);
		
			for (let j = 0; j < numPoints; j++) {
				
				let pointOffset = j * bytesPerPoint;

				let x = (view.getUint32(pointOffset + attributeOffset + 0, true) * scale[0]) + offset[0] - min.x;
				let y = (view.getUint32(pointOffset + attributeOffset + 4, true) * scale[1]) + offset[1] - min.y;
				let z = (view.getUint32(pointOffset + attributeOffset + 8, true) * scale[2]) + offset[2] - min.z;

				positions[3 * j + 0] = x;
				positions[3 * j + 1] = y;
				positions[3 * j + 2] = z;
			}

			attributeBuffers[pointAttribute.name] = { buffer: buff, attribute: pointAttribute };
		}else if(["RGBA", "rgba"].includes(pointAttribute.name)){
			let buff = new ArrayBuffer(numPoints * 4);
			let colors = new Uint8Array(buff);

			for (let j = 0; j < numPoints; j++) {
				let pointOffset = j * bytesPerPoint;

				let r = view.getUint16(pointOffset + attributeOffset + 0, true);
				let g = view.getUint16(pointOffset + attributeOffset + 2, true);
				let b = view.getUint16(pointOffset + attributeOffset + 4, true);

				colors[4 * j + 0] = r > 255 ? r / 256 : r;
				colors[4 * j + 1] = g > 255 ? g / 256 : g;
				colors[4 * j + 2] = b > 255 ? b / 256 : b;
			}

			attributeBuffers[pointAttribute.name] = { buffer: buff, attribute: pointAttribute };
		}else {
			let buff = new ArrayBuffer(numPoints * 4);
			let f32 = new Float32Array(buff);

			// console.log(pointAttribute.name, pointAttribute.type.name);

			let TypedArray = typedArrayMapping[pointAttribute.type.name];
			preciseBuffer = new TypedArray(numPoints);

			let [min, max] = [Infinity, -Infinity];
			let [offset, scale] = [0, 1];

			const getterMap = {
				"int8":   view.getInt8,
				"int16":  view.getInt16,
				"int32":  view.getInt32,
				"int64":  view.getInt64,
				"uint8":  view.getUint8,
				"uint16": view.getUint16,
				"uint32": view.getUint32,
				"uint64": view.getUint64,
				"float":  view.getFloat32,
				"double": view.getFloat64,
			};
			const getter = getterMap[pointAttribute.type.name].bind(view);

			// compute offset and scale to pack larger types into 32 bit floats
			if(pointAttribute.type.size > 4){
				for(let j = 0; j < numPoints; j++){
					let pointOffset = j * bytesPerPoint;
					let value = getter(pointOffset + attributeOffset, true);

					if(!Number.isNaN(value)){
						min = Math.min(min, value);
						max = Math.max(max, value);
					}
				}

				

				if(pointAttribute.initialRange != null){
					offset = pointAttribute.initialRange[0];
					scale = 1 / (pointAttribute.initialRange[1] - pointAttribute.initialRange[0]);
				}else {
					offset = min;
					scale = 1 / (max - min);
				}
			}

			for(let j = 0; j < numPoints; j++){
				let pointOffset = j * bytesPerPoint;
				let value = getter(pointOffset + attributeOffset, true);

				if(!Number.isNaN(value)){
					min = Math.min(min, value);
					max = Math.max(max, value);
				}

				f32[j] = (value - offset) * scale;
				preciseBuffer[j] = value;
			}

			pointAttribute.range = [min, max];

			//console.log(pointAttribute.range);
			//attributeBuffers[pointAttribute.name] = { buffer: buff, attribute: pointAttribute };
			attributeBuffers[pointAttribute.name] = { 
				buffer: buff,
				preciseBuffer: preciseBuffer,
				attribute: pointAttribute,
				offset: offset,
				scale: scale,
			};
		}

		attributeOffset += pointAttribute.byteSize;


	}

	{ // add indices
		let buff = new ArrayBuffer(numPoints * 4);
		let indices = new Uint32Array(buff);

		for (let i = 0; i < numPoints; i++) {
			indices[i] = i;
		}
		
		attributeBuffers["INDICES"] = { buffer: buff, attribute: PointAttribute.INDICES };
	}


	{ // handle attribute vectors
		let vectors = pointAttributes.vectors;

		for(let vector of vectors){

			let {name, attributes} = vector;
			let numVectorElements = attributes.length;
			let buffer = new ArrayBuffer(numVectorElements * numPoints * 4);
			let f32 = new Float32Array(buffer);

			let iElement = 0;
			for(let sourceName of attributes){
				let sourceBuffer = attributeBuffers[sourceName];
				let {offset, scale} = sourceBuffer;
				let view = new DataView(sourceBuffer.buffer);

				const getter = view.getFloat32.bind(view);

				for(let j = 0; j < numPoints; j++){
					let value = getter(j * 4, true);

					f32[j * numVectorElements + iElement] = (value / scale) + offset;
				}

				iElement++;
			}

			let vecAttribute = new PointAttribute(name, PointAttributeTypes.DATA_TYPE_FLOAT, 3);

			attributeBuffers[name] = { 
				buffer: buffer, 
				attribute: vecAttribute,
			};

		}

	}



	let message = {
		buffer: buffer,
		attributeBuffers: attributeBuffers,
	};

	let transferables = [];
	for (let property in message.attributeBuffers) {
		transferables.push(message.attributeBuffers[property].buffer);
	}
	transferables.push(buffer);

	postMessage(message, transferables);
};
