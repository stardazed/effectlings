/**
 * To invent a conversion, describe both directions:
 *
 *   SchemaTransformation.transform({ decode, encode })
 *
 * and attach it with Schema.decode, which keeps the same kind of value on
 * both sides and only changes the number:
 *
 *   Schema.Finite.pipe(Schema.decode(transformation))
 *
 * (Schema.Finite is Schema.Number without NaN and infinities.)
 *
 * Goal: the outside world sends meters, your program works in kilometers.
 */
import { Schema, SchemaTransformation } from "effect"

const Kilometers: Schema.Codec<number> = Schema.Finite.pipe(
  Schema.decode(
    SchemaTransformation.transform({
      decode: (meters: number) => meters / 1000,
      encode: (kilometers: number) => kilometers * 1000
    })
  )
)

check("decode", Schema.decodeUnknownSync(Kilometers)(2500), 2.5)
check("encode", Schema.encodeSync(Kilometers)(2.5), 2500)
